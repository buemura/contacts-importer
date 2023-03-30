import { Request, Response, Router } from "express";
import multer from "multer";

import { GetFilesUsecase } from "../../../application/usecases/get-files-usecase";
import { NewFileImportUsecase } from "../../../application/usecases/new-file-import-usecase";
import { uploadConfig } from "../../../config/multer";
import { PrismaFileRepository } from "../../database/prisma/file-repository";
import { RabbitMQProducer } from "../../messaging";
import { FilesController } from "../controllers/files-controller";

const eventProducer = new RabbitMQProducer();
const fileRepository = new PrismaFileRepository();
const getFilesUsecase = new GetFilesUsecase(fileRepository);
const newFileImportUsecase = new NewFileImportUsecase(
  fileRepository,
  eventProducer
);
const filesController = new FilesController(
  getFilesUsecase,
  newFileImportUsecase
);

const routers = Router();
const upload = multer(uploadConfig);

routers.get("/files", (request: Request, response: Response) => {
  return filesController.getFiles(request, response);
});

routers.post(
  "/files",
  upload.single("file"),
  (request: Request, response: Response) => {
    return filesController.newFile(request, response);
  }
);

export { routers as filesRouters };
