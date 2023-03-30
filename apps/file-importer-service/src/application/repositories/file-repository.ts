import { File } from "../entities/file";

export interface FileRepository {
  findAll(): Promise<File[]>;
  findById(id: string): Promise<File | undefined>;
  create(file: File): Promise<File>;
  update(id: string, status: string): Promise<File | undefined>;
}
