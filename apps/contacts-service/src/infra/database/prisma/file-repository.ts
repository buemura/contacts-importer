import { PrismaClient } from "@prisma/client";
import { NewFileDto, UpdateFileDto } from "src/application/dtos/new-file-dto";
import { File } from "../../../application/entities/file";
import { FileRepository } from "../../../application/repositories/file-repository";

export class PrismaFileRepository implements FileRepository {
  private readonly fileRespository;

  constructor() {
    const prisma = new PrismaClient();
    this.fileRespository = prisma.file;
  }

  async create(data: NewFileDto): Promise<File> {
    return this.fileRespository.create({
      data: {
        id: data.id,
        status: data.status,
      },
    });
  }

  async update(data: UpdateFileDto): Promise<File> {
    return this.fileRespository.update({
      where: {
        id: data.id,
      },
      data: {
        status: data.status,
      },
    });
  }
}
