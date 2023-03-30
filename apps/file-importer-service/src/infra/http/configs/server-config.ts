import cors from "cors";
import express from "express";
import http from "http";
import { routers } from "../routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routers);

const server = http.createServer(app);
export { server };
