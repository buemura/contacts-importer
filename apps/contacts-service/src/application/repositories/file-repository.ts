import { NewFileDto, UpdateFileDto } from "../dtos/new-file-dto";
import { File } from "../entities/file";

export interface FileRepository {
  create(data: NewFileDto): Promise<File>;
  update(data: UpdateFileDto): Promise<File>;
}
