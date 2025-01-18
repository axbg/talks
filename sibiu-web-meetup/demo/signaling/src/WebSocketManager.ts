import { Server, Socket } from "socket.io";
import http from "http";

interface JoinMessage {
    channel: string;
}

interface WebRTCPayload {
    channel: string;
    offer?: RTCSessionDescription;
    from?: string;
}

interface ICEPayload {
    from: string;
    to: string;
    candidate: RTCIceCandidate;
}

interface ClientEvent {
    "join-channel": (joinMessage: JoinMessage) => void;
    "webrtc-offer": (payload: WebRTCPayload) => void;
    "webrtc-answer": (payload: WebRTCPayload) => void;
    "ice-candidate": (payload: ICEPayload) => void;
    "disconnect": () => void;
}

interface ServerEvent {
    "no-channel": (data: {}) => void;
    "existing-channel": () => void;
    "user-joined": (userId: string) => void;
    "webrtc-offer": (payload: WebRTCPayload) => void;
    "webrtc-answer": (payload: WebRTCPayload) => void;
    "ice-candidate": (payload: ICEPayload) => void;
}

interface RoomData {
    users: string[];
}

function toImmutableSnapshot<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}

class WebSocketManager {
    #io: Server;
    #rooms: Record<string, RoomData>;

    constructor(server: http.Server) {
        this.#io = new Server<ClientEvent, ServerEvent>(server);
        this.#rooms = {};

        this.#initializeHandlers();
    }

    public get rooms(): Record<string, RoomData> {
        return toImmutableSnapshot<Record<string, RoomData>>(this.#rooms);
    }

    static attach(server: http.Server) {
        console.log("WebSocketManager instance attached to server");

        return new WebSocketManager(server);
    }

    static detach(wsManager: WebSocketManager, handler: () => void) {
        if (!!wsManager && !!wsManager.#io) {
            wsManager.#io.close()
                .then(_ => handler());
        }
    }

    #initializeHandlers() {
        this.#io.on("connection", (socket: Socket<ClientEvent, ServerEvent>) => {
            console.log("New client connected:", socket.id);

            socket.on("join-channel", (msg: JoinMessage) => this.#handleJoinChannel(socket, msg));
            socket.on("webrtc-offer", (payload: WebRTCPayload) => this.#handleWebRTCOffer(socket, payload));
            socket.on("webrtc-answer", (payload: WebRTCPayload) => this.#handleWebRTCAnswer(socket, payload));
            socket.on("ice-candidate", (payload: ICEPayload) => this.#handleICECandidate(socket, payload));
            socket.on("disconnect", () => this.#handleDisconnect(socket));
        });
    }

    #handleJoinChannel(socket: Socket<ClientEvent, ServerEvent>, joinMessage: JoinMessage) {
        if (!this.#rooms[joinMessage.channel]) {
            this.#rooms[joinMessage.channel].users.push(socket.id);
        } else {
            this.#rooms[joinMessage.channel].users = [socket.id]
        }

        socket.to(joinMessage.channel).emit("user-joined", socket.id);
    }

    #handleWebRTCOffer(socket: Socket<ClientEvent, ServerEvent>, payload: WebRTCPayload) {
        console.log("Offer received from owner to " + payload.channel);

        socket.broadcast.to(payload.channel).emit("webrtc-offer", payload);
    }

    #handleWebRTCAnswer(socket: Socket<ClientEvent, ServerEvent>, payload: WebRTCPayload) {
        console.log("Answer received from", payload.from);
        socket.broadcast.to(payload.channel).emit("webrtc-answer", payload);
    }

    #handleICECandidate(socket: Socket<ClientEvent, ServerEvent>, payload: ICEPayload) {
        console.log("ICE Candidate received from " + payload.from + " to " + payload.to);
        socket.to(payload.to).emit("ice-candidate", payload);
    }

    #handleDisconnect(socket: Socket<ClientEvent, ServerEvent>) {
        console.log("Client disconnected:", socket.id);

        // Find the channel this socket was in
        const channel = Object.keys(this.#rooms).find(ch =>
            this.#rooms[ch].users.includes(socket.id)
        );

        if(channel) {
            if (this.#rooms[channel] && this.#rooms[channel].users.length === 1) {
                // remove channel if this is the last user connected
                delete this.#rooms[channel];
            } else {
                this.#rooms[channel].users = this.#rooms[channel].users.filter(id => id !== socket.id);
            }
        }
    }
}

export { WebSocketManager };