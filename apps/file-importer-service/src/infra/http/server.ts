import { makeEventListener } from "../factories/make-event-listener";
import { webSocket } from "./configs/server-socket";

export function bootstrap() {
  const eventListener = makeEventListener();
  eventListener.execute();

  webSocket.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);
  });
}
