export class NewContactsDto {
  fileId: string;
  fileStatus: string;
  content: ContactFromEvent[];
}

export class ContactFromEvent {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  company: string;
  jobTitle: string;
  creditCardNumber: string;
  dateOfBirth: string;
}
