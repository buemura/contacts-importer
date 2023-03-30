import { formatMessage } from "../../helpers/format-message";
import { File, FileProps } from "../entities/file";
import { EventProducer } from "../event/event-producer";
import { FileRepository } from "../repositories/file-repository";

export class NewFileImportUsecase {
  constructor(
    private readonly fileRepository: FileRepository,
    private readonly eventProducer: EventProducer
  ) {}

  async execute(data: FileProps) {
    const file = new File(data);

    console.log(file);

    // await this.fileRepository.create(file);

    const messageToSend = formatMessage({
      eventType: "FILE/IMPORT_NEW",
      data: file,
    });

    console.log(messageToSend);

    // await this.eventProducer.produce({
    //   queue: QUEUES.CONTACTS_IMPORTER_FILE,
    //   message: messageToSend,
    // });
  }
}
