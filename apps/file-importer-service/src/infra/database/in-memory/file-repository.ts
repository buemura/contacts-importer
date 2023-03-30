import { File } from "../../../application/entities/file";
import { FileRepository } from "../../../application/repositories/file-repository";

export class InMemoryFileRepository implements FileRepository {
  private files: File[] = [];

  async findAll(): Promise<File[]> {
    return this.files;
  }

  async findById(id: string): Promise<File | undefined> {
    return this.files.find((file) => file.id === id);
  }

  async create(file: File): Promise<File> {
    this.files.push(file);
    return file;
  }

  async update(id: string, status: string): Promise<File | undefined> {
    const file = this.files.find((file) => file.id === id);
    if (!file) {
      return;
    }

    file.status = status;
    return file;
  }
}
