import { QUEUES } from "../../helpers/constants/messaging";
import { formatMessage } from "../../helpers/format-message";
import { NewFileDto } from "../dtos/new-file-dto";
import { EventProducer } from "../event/event-producer";
import { FileRepository } from "../repositories/file-repository";

export class NewFileImportUsecase {
  constructor(
    private readonly fileRepository: FileRepository,
    private readonly eventProducer: EventProducer
  ) {}

  async execute(data: NewFileDto) {
    const file = await this.fileRepository.create(data);

    const messageToSend = formatMessage({
      eventType: "FILE/IMPORT_NEW",
      data: file,
    });

    await this.eventProducer.produce({
      queue: QUEUES.CONTACTS_IMPORTER_FILE,
      message: messageToSend,
    });
  }
}
