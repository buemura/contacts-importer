import { adaptCsvToContacts } from "../../adapters/adapt-csv-to-contacts";
import { QUEUES } from "../../helpers/constants/messaging";
import { formatMessage } from "../../helpers/format-message";
import { CsvToJson } from "../../providers/csv-to-json";
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

    const rawJsonData = await CsvToJson.execute(file.path);
    const contacts = adaptCsvToContacts(rawJsonData);

    const dataToSend = {
      fileId: file.id,
      fileStatus: file.status,
      content: contacts,
    };

    const messageToSend = formatMessage({
      data: dataToSend,
    });

    await this.eventProducer.produce({
      queue: QUEUES.CONTACTS_FILE_NEW,
      message: messageToSend,
    });

    return {
      id: file.id,
    };
  }
}
