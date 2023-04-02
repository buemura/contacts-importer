import { io, Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "../types/socket";

const serverSocketURL = "http://localhost:5000";

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> =
  io(serverSocketURL).connect();

socket.on("connect_error", () => {
  console.log("Error connecting websocket");
  socket.io.opts.transports = ["polling", "websocket"];
});
