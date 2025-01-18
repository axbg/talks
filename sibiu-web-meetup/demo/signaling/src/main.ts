import "dotenv/config";

import express from 'express';
import http from "http";
import {WebSocketManager} from "./WebSocketManager";
import {attachGracefulShutdownHandler} from "./shutdown";

const PORT = process.env.PORT || 8080;

const app = express();
const server = http.createServer(app);
const wsManager = WebSocketManager.attach(server);

app.post("/generate-token", (req, res) => {
    res.send({"message": "hello there"});
})

attachGracefulShutdownHandler(wsManager, server);

server.listen(PORT, () => {
    console.log("Signaling server started on http://localhost:" + PORT);
})
