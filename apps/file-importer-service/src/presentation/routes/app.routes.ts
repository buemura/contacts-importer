import { Request, Response, Router } from "express";

const routers = Router();

routers.get("/health", (request: Request, reply: Response) => {
  console.log("reached");

  return reply.send({
    message: "API up and running...",
  });
});

export { routers as appRouters };
