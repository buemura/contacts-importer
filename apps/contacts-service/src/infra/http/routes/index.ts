import { Request, Response, Router } from "express";

import { appRouters } from "./app.routes";

const routers = Router();

routers.get("/api/health", (_request: Request, response: Response) => {
  return response.send({
    message: "API is up and running",
  });
});

routers.use("/api", appRouters);

export { routers };
