import { randomUUID } from "crypto";

interface ContactProps {
  name: string;
  email: string;
  company: string;
}

export class Contact {
  id: string;
  name: string;
  email: string;
  company: string;

  constructor(props: ContactProps) {
    this.id = randomUUID();
    this.name = props.name;
    this.email = props.email;
    this.company = props.company;
  }
}
