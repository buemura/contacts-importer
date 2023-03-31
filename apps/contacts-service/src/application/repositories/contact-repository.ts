import { NewContactDto } from "../dtos/new-contact-dto";
import { Contact } from "../entities/contact";

export interface ContactRepository {
  findAll(): Promise<Contact[]>;
  findByFileId(fileId: string): Promise<Contact[]>;
  findValidByFileId(fileId: string): Promise<Contact[]>;
  findInvalidByFileId(fileId: string): Promise<Contact[]>;
  create(data: NewContactDto): Promise<Contact>;
  createMany(data: NewContactDto[]): Promise<void>;
}
