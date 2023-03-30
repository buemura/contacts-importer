import { PrismaClient } from "@prisma/client";
import { NewFileDto } from "src/application/dtos/new-file-dto";
import { File } from "../../../application/entities/file";
import { FileRepository } from "../../../application/repositories/file-repository";

export class PrismaFileRepository implements FileRepository {
  private readonly fileRespository;

  constructor() {
    const prisma = new PrismaClient();
    this.fileRespository = prisma.file;
  }

  async findAll(): Promise<File[]> {
    return this.fileRespository.findMany();
  }

  async findById(id: string): Promise<File | null> {
    return this.fileRespository.findFirst({
      where: {
        id,
      },
    });
  }

  async create(data: NewFileDto): Promise<File> {
    return this.fileRespository.create({
      data: {
        name: data.name,
        path: data.path,
        status: "On Hold",
      },
    });
  }

  async update(id: string, status: string): Promise<File | undefined> {
    return this.fileRespository.update({
      where: { id },
      data: { status },
    });
  }
}
