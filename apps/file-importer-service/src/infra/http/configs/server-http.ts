import cors from "cors";
import express from "express";
import http from "http";
import { routers } from "../../../presentation/routes";

const app = express();
const PORT = process.env.PORT ?? 5000;

app.use(cors());
app.use(express.json());
app.use(routers);

const httpServer = http.createServer(app);

httpServer.listen(PORT, () => {
  console.log(`Http Server running...`);
});

export { httpServer };
