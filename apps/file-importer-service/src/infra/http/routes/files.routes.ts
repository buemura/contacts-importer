import { Request, Response, Router } from "express";
import multer from "multer";

import { GetFilesUsecase } from "../../../application/usecases/get-files-usecase";
import { NewFileImportUsecase } from "../../../application/usecases/new-file-import-usecase";
import { uploadConfig } from "../../../config/multer";
import { InMemoryFileRepository } from "../../database/in-memory/file-repository";
import { InMemoryEventProducer } from "../../messaging/in-memory/producer";
import { FilesController } from "../controllers/files-controller";

const eventProducer = new InMemoryEventProducer();
const fileRepository = new InMemoryFileRepository();
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
