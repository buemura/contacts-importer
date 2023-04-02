import { Request, Response, Router } from "express";

import { appRouters } from "./app.routes";
import { filesRouters } from "./files.routes";

const routers = Router();

routers.get("/api/health", (_request: Request, response: Response) => {
  return response.send({
    message: "API is up and running",
  });
});

routers.use("/api", appRouters, filesRouters);

export { routers };
