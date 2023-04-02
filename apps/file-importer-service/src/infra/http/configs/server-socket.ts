import { Server } from "socket.io";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "../types/socket";
import { httpServer } from "./server-http";

const clientSocketURL = "http://127.0.0.1:5173";

const webSocket = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(httpServer, {
  cors: {
    origin: clientSocketURL,
  },
});

export { webSocket };
