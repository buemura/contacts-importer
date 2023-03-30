import { NewFileDto } from "../dtos/new-file-dto";
import { File } from "../entities/file";

export interface FileRepository {
  findAll(): Promise<File[]>;
  findById(id: string): Promise<File | null>;
  create(file: NewFileDto): Promise<File>;
  update(id: string, status: string): Promise<File | undefined>;
}
