import { webSocket } from "./server-socket";

export function bootstrap() {
  webSocket.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);
  });
}
