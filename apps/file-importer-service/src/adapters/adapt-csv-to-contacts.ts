import { Contact } from "src/application/entities/contact";

interface JsonFromCSV {
  name: string;
  email: string;
  phone_number: string;
  address: string;
  company: string;
  job_title: string;
}

export function adaptCsvToContacts(data: JsonFromCSV[]): Contact[] {
  return data.map((contact) => ({
    name: contact.name,
    email: contact.email,
    phoneNumber: contact.phone_number,
    address: contact.address,
    company: contact.company,
    jobTitle: contact.job_title,
  }));
}
