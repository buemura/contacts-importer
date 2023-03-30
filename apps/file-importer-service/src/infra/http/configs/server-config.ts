import cors from "cors";
import express from "express";
import http from "http";
import { eventListener } from "../../events/listener";
import { routers } from "../routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routers);

eventListener();

const server = http.createServer(app);
export { server };
