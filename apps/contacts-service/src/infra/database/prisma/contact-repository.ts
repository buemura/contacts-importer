import { PrismaClient } from "@prisma/client";
import { NewContactDto } from "../../../application/dtos/new-contact-dto";
import { Contact } from "../../../application/entities/contact";
import { ContactRepository } from "../../../application/repositories/contact-repository";

export class PrismaContactRepository implements ContactRepository {
  private readonly prismaClient: PrismaClient;
  private readonly contactRespository;

  constructor() {
    this.prismaClient = new PrismaClient();
    this.contactRespository = this.prismaClient.contact;
  }

  async findAll(): Promise<Contact[]> {
    return this.contactRespository.findMany();
  }

  async findByFileId(fileId: string): Promise<Contact[]> {
    return this.contactRespository.findMany({
      where: { fileId },
    });
  }

  async findValidByFileId(fileId: string): Promise<Contact[]> {
    return this.contactRespository.findMany({
      where: { fileId, isValid: true },
    });
  }

  async findInvalidByFileId(fileId: string): Promise<Contact[]> {
    return this.contactRespository.findMany({
      where: { fileId, isValid: false },
    });
  }

  async create(data: NewContactDto): Promise<Contact> {
    const contact = await this.contactRespository.create({
      data: {
        fileId: data.fileId,
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        address: data.address,
        company: data.company,
        jobTitle: data.jobTitle,
        creditCardNumber: data.creditCardNumber,
        dateOfBirth: data.dateOfBirth,
        isValid: data.isValid,
        errors: data.errors,
      },
    });
    return contact;
  }

  async createMany(data: NewContactDto[]): Promise<void> {
    await this.contactRespository.createMany({ data });
  }
}
