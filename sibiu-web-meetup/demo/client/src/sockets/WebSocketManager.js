import { io } from "socket.io-client";
import { signalingServer } from "../data/defaults";

class WebSocketManager {
    #socket = null;

    #captureWebcam = null;
    #captureMicStream = null;

    #peerConnections = {};

    constructor(captureWebcam, captureMicStream) {
        this.#socket = io(signalingServer);
        this.#captureWebcam = captureWebcam;
        this.#captureMicStream = captureMicStream;
    }

    connect(channelName, configurations, setIsActive, setVideoStream, captureMic) {
        this.#socket.connect();
        this.startChannel(channelName, configurations, setIsActive, setVideoStream, captureMic);
    }

    async startChannel(channelName, configurations, setIsActive, setVideoStream) {
        this.attachSocketHandlers(channelName, configurations, setIsActive, setVideoStream );
        this.#socket.emit("join-channel", { channel: channelName, type: "sharer" });
        setIsActive(true);
    }

    async attachSocketHandlers(channelName, configurations, setIsActive, setVideoStream, setViewersCount) {
        this.#socket.on("existing-channel", () => {
            this.disconnect(setIsActive, setVideoStream, setViewersCount);
            alert("Channel " + channelName + " is already existing");
        });

        this.#socket.on("user-joined", async (socketId) => {
            const peerConnection = new RTCPeerConnection({
                iceServers: configurations,
                iceTransportPolicy: "all",
                bundlePolicy: "max-bundle",
                rtcpMuxPolicy: "require",
                sdpSemantics: "unified-plan",
                iceCandidatePoolSize: 10
            });

            this.#peerConnections[socketId] = peerConnection;

            this.#captureWebcam.getTracks().forEach(track => {
                if (track.kind === 'video') {
                    peerConnection.addTransceiver(track, {
                        direction: 'sendonly',
                        streams: [this.#captureWebcam],
                        sendEncodings: [{
                            scalabilityMode: 'L3T3',
                            maxBitrate: 3000000,
                            maxFramerate: 60
                        }]
                    });
                    console.log("Added video tracks");
                }
            });

            if (this.#captureMicStream) {
                this.#captureMicStream.getTracks().forEach(track => {
                    peerConnection.addTrack(track, this.#captureWebcam);
                    console.log("Added mic track");
                })
            }

            peerConnection.getSenders().forEach(sender => {
                console.log("Sender track:", sender.track);
            });

            peerConnection.onicecandidate = (event) => {
                if (event.candidate) {
                    this.#socket.emit("ice-candidate", {
                        channel: channelName,
                        from: this.#socket.id,
                        to: socketId,
                        candidate: event.candidate
                    });

                    console.log("Sent ICE candidate to:", event.candidate);
                }
            };

            peerConnection.oniceconnectionstatechange = () => {
                const state = peerConnection.iceConnectionState;

                if (state === "connected") {
                    setViewersCount((viewers) => viewers + 1);
                } else if (state === "disconnected" || state === "failed") {
                    setViewersCount((viewers) => viewers > 0 ? viewers - 1 : viewers);
                    console.log("Client " + socketId + " disconnected");
                    peerConnection.close();
                    delete this.#peerConnections[socketId];
                }
            }

            const offer = await peerConnection.createOffer();
            const modifiedOffer = offer.sdp.replace("VP8", "H264");
            await peerConnection.setLocalDescription(new RTCSessionDescription({ type: "offer", sdp: modifiedOffer }));

            this.#socket.emit("webrtc-offer", { channel: channelName, target: socketId, sdp: offer });

            console.log("Screen sharing started, offer sent to channel:", channelName);
        });

        this.#socket.on("webrtc-answer", (payload) => {
            this.#peerConnections[payload.from].setRemoteDescription(new RTCSessionDescription(payload.sdp))
              .then(() => console.log("Received answer from viewer", payload))
              .catch(error => console.error("Error setting remote description:", error));
          });
        
        this.#socket.on("ice-candidate", (payload) => {
            this.#peerConnections[payload.from].addIceCandidate(new RTCIceCandidate(payload.candidate))
              .then(() => console.log("Added ICE candidate from viewer", payload.candidate))
              .catch(error => console.error("Error adding ICE candidate:", error));
          });
    }

    disconnect(setIsActive, setVideoStream) {
        this.#socket.disconnect();

        if (this.#captureWebcam) {
            this.#captureWebcam.getTracks().forEach(track => track.stop());
        }

        if (this.#captureMicStream) {
            this.#captureMicStream.getTracks().forEach(track => track.stop());
        }

        this.#captureWebcam = null;
        this.#captureMicStream = null;

        setVideoStream(null);
        setIsActive(false);
    }
}

export default WebSocketManager;