import { FileRepository } from "../repositories/file-repository";

export class GetFilesUsecase {
  constructor(private readonly fileRepository: FileRepository) {}

  async execute() {
    const file = await this.fileRepository.findAll();
    return file;
  }
}
