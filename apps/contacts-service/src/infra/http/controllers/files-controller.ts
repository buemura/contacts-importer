import { Request, Response } from "express";
import { GetFilesUsecase } from "../../../application/usecases/get-files-usecase";
import { NewFileImportUsecase } from "../../../application/usecases/new-file-import-usecase";
import { AppError } from "../../../helpers/errors/app-error";
import { ERROR_MESSAGE } from "../../../helpers/errors/messages";

export class FilesController {
  constructor(
    private readonly getFilesUsecase: GetFilesUsecase,
    private readonly newFileImportUsecase: NewFileImportUsecase
  ) {}

  async getFiles(request: Request, reply: Response) {
    try {
      const files = await this.getFilesUsecase.execute();
      return reply.send(files);
    } catch (error: any) {
      return reply.send({
        message: error.message,
      });
    }
  }

  async newFile(request: Request, reply: Response) {
    const { file } = request;

    try {
      if (!file) {
        throw new AppError(ERROR_MESSAGE.MISSING_FILE);
      }

      const result = await this.newFileImportUsecase.execute({
        name: file?.filename,
        path: `./uploads/${file?.filename}`,
      });
      return reply.send(result);
    } catch (error: any) {
      return reply.send({
        message: error.message,
      });
    }
  }
}
