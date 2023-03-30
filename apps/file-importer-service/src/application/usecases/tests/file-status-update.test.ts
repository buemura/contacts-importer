import { FileRepository } from "../repositories/file-repository";

interface FileStatusUpdateProps {
  fileId: string;
  status: string;
}

export class FileStatusUpdate {
  constructor(private readonly fileRepository: FileRepository) {}

  async execute({ fileId, status }: FileStatusUpdateProps) {
    const file = await this.fileRepository.findById(fileId);
    if (!file) {
      console.log(`No file with id ${fileId} found`);
      return;
    }

    console.log(`Updating file ${fileId} to status ${status}`);
    file.updateStatus(status);
    await this.fileRepository.update(fileId, status);
    console.log(`Successfully updated file ${fileId}`);
  }
}