import cors from "cors";
import express from "express";
import http from "http";
import { eventListener } from "../../events/listener";
import { routers } from "../routes";

const app = express();
const PORT = process.env.PORT ?? 5000;

app.use(cors());
app.use(express.json());
app.use(routers);

eventListener();

const httpServer = http.createServer(app);

httpServer.listen(PORT, () => {
  console.log(`Http Server running...`);
});

export { httpServer };
