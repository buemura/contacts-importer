import { randomUUID } from "crypto";

export interface FileProps {
  name: string;
  path: string;
}

export class File {
  id: string;
  name: string;
  path: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(props: FileProps) {
    this.id = randomUUID();
    this.name = props.name;
    this.path = props.path;
    this.status = "On Hold";
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  updateStatus(status: string) {
    this.status = status;
    this.updatedAt = new Date();
  }
}
