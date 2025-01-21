import {io} from "socket.io-client";
import {signalingServer} from "../data/defaults";

class WebSocketManager {
    #socket = null;

    #localWebcamStream = null;
    #shouldDisconnect = false;

    #peerConnections = {};

    constructor() {
        this.#socket = io(signalingServer);
    }

    connect(channelName, configurations, localWebcamStream, setIsActive, setRemoteVideoStreams) {
        this.#socket.connect();
        this.#localWebcamStream = localWebcamStream;
        this.joinChannel(channelName, configurations, setIsActive, setRemoteVideoStreams);
    }

    async joinChannel(channelName, configurations, setIsActive, setRemoteVideoStreams) {
        this.attachSocketHandlers(channelName, configurations, setIsActive, setRemoteVideoStreams);
        this.#socket.emit("join-channel", {channel: channelName});
        setIsActive(true);
    }

    async attachSocketHandlers(channelName, configurations, setIsActive, setRemoteVideoStreams) {
        this.attachJoinSocketHandlers(channelName, configurations, setIsActive, setRemoteVideoStreams);
        this.attachUserJoinedSocketHandlers(channelName, configurations, setIsActive, setRemoteVideoStreams);
    }

    async attachJoinSocketHandlers(channelName, configurations, setIsActive, setRemoteVideoStreams) {
        this.#socket.on("no-channel", () => {
            console.log("something not good");
            this.disconnect(setIsActive, setRemoteVideoStreams);
        });

        this.#socket.on("discover-peers", async (peers) => {
            for (const socketId of peers) {
                const peerConnection = new RTCPeerConnection({
                    iceServers: configurations,
                    iceTransportPolicy: "all",
                    bundlePolicy: "max-bundle",
                    rtcpMuxPolicy: "require",
                    sdpSemantics: "unified-plan",
                    iceCandidatePoolSize: 10
                });

                this.#peerConnections[socketId] = peerConnection;

                // this.#localWebcamStream.getTracks().forEach(track => {
                //     if (track.kind === 'video') {
                //         peerConnection.addTransceiver(track, {
                //             direction: 'sendrecv',
                //             streams: [this.#localWebcamStream],
                //             sendEncodings: [{
                //                 scalabilityMode: 'L3T3',
                //                 maxBitrate: 3000000,
                //                 maxFramerate: 60
                //             }]
                //         });
                //         console.log("Added video tracks");
                //     } else {
                //         peerConnection.addTrack(track, this.#localWebcamStream);
                //         console.log("Added device audio track");
                //     }
                // });

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

                peerConnection.ontrack = (event) => {
                    console.log("Track event received:", event);
                    const mediaStream = event.streams[0];
                    setRemoteVideoStreams((mediaStreams) => ({...mediaStreams, [socketId]: mediaStream}));
                };

                peerConnection.onconnectionstatechange = () => {
                    console.log(peerConnection.connectionState);

                    switch (peerConnection.connectionState) {
                        case "connected":
                            break;
                        case "disconnected":
                            if (this.#shouldDisconnect) {
                                console.log("correctly disconnected");
                            } else {
                                console.log("unexpected disconnect, trying reconnection");
                                setRemoteVideoStreams(remoteStreams => Object.fromEntries(Object.entries(remoteStreams).filter(([key]) => key !== socketId)));
                                break;
                            }
                        // case "closed":
                        // case "failed":
                        //     this.disconnect(socketId, setIsActive, setVideoStream);
                        //     break;
                    }
                }

                peerConnection.onnegotiationneeded = async () => {
                    const offer = await peerConnection.createOffer();
                    await peerConnection.setLocalDescription(offer);

                    this.#socket.emit("webrtc-offer", {
                        channel: channelName,
                        to: socketId,
                        sdp: peerConnection.localDescription,
                        from: this.#socket.id
                    });
                }

                const offer = await peerConnection.createOffer({offerToReceiveAudio: true, offerToReceiveVideo: true});
                await peerConnection.setLocalDescription(offer);

                this.#socket.emit("webrtc-offer", {
                    channel: channelName,
                    to: socketId,
                    sdp: offer,
                    from: this.#socket.id
                });

                setTimeout(() => {
                    this.#localWebcamStream.getTracks().forEach(track => {
                        peerConnection.addTrack(track, this.#localWebcamStream);
                    });
                }, 5000);
            }
        });

        this.#socket.on("webrtc-answer", (payload) => {
            console.log("received answer");
            console.log(payload);

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

    async attachUserJoinedSocketHandlers(channelName, configurations, setIsActive, setRemoteVideoStreams) {
        this.#socket.on("webrtc-offer", async (payload) => {
            console.log("Offer received from sharer:", payload);
            const socketId = payload.from;

            let peerConnection;
            // if renegociation, don't recreate bindings, but accept new offer
            if(this.#peerConnections[socketId]) {
                peerConnection = this.#peerConnections[socketId];
                await peerConnection.setRemoteDescription(new RTCSessionDescription(payload.sdp));

                const answer = await peerConnection.createAnswer();
                await peerConnection.setLocalDescription(answer);

                this.#socket.emit("webrtc-answer", {
                    channel: channelName,
                    sdp: answer,
                    from: this.#socket.id,
                    to: socketId
                });

                return;
            } else {
                peerConnection = new RTCPeerConnection({
                    iceServers: configurations,
                    iceTransportPolicy: "all",
                    bundlePolicy: "max-bundle",
                    rtcpMuxPolicy: "require",
                    sdpSemantics: "unified-plan",
                    iceCandidatePoolSize: 10
                });
            }

            this.#peerConnections[socketId] = peerConnection;

            this.#localWebcamStream.getTracks().forEach(track => {
                if (track.kind === 'video') {
                    peerConnection.addTrack(track, this.#localWebcamStream);
                    console.log("Added video tracks");
                } else {
                    peerConnection.addTrack(track, this.#localWebcamStream);
                    console.log("Added device audio track");
                }
            });

            peerConnection.getSenders().forEach(sender => {
                console.log("Sender track:", sender.track);
            });

            peerConnection.ontrack = (event) => {
                console.log("Track event received:", event);
                const mediaStream = event.streams[0];
                setRemoteVideoStreams((mediaStreams) => ({...mediaStreams, [socketId]: mediaStream}));
            };

            await peerConnection.setRemoteDescription(new RTCSessionDescription(payload.sdp));

            const answer = await peerConnection.createAnswer();
            await peerConnection.setLocalDescription(answer);

            peerConnection.onicecandidate = (event) => {
                console.log("ICE found", event.candidate);
                if (event.candidate) {
                    this.#socket.emit("ice-candidate", {
                        channel: channelName,
                        from: this.#socket.id,
                        to: socketId,
                        candidate: event.candidate
                    });

                    console.log("Sent ICE candidate to sharer:", event.candidate);
                }
            };

            peerConnection.onconnectionstatechange = () => {
                console.log(peerConnection.connectionState);

                switch (peerConnection.connectionState) {
                    case "connected":
                        break;
                    case "disconnected":
                        if (this.#shouldDisconnect) {
                            console.log("correctly disconnected");
                        } else {
                            setRemoteVideoStreams(remoteStreams => Object.fromEntries(Object.entries(remoteStreams).filter(([key]) => key !== socketId)));
                            break;
                        }
                    // case "closed":
                    // case "failed":
                    //     this.disconnect(setIsActive, setVideoStream);
                    //     break;
                }
            }

            this.#socket.emit("webrtc-answer", {
                channel: channelName,
                sdp: answer,
                from: this.#socket.id,
                to: socketId
            });
        });
    }

    disconnect(setIsActive, setRemoteVideoStreams) {
        this.#socket.disconnect();

        setRemoteVideoStreams([]);
        setIsActive(false);

        Object.values(this.#peerConnections).forEach(peerConnection => peerConnection.close());
    }
}

export default WebSocketManager;