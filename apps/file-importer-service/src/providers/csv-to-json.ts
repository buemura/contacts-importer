import Csv2Json from "csvtojson";

export class CsvToJson {
  static async execute(filename: string) {
    const result = await Csv2Json().fromFile(filename);
    return result;
  }
}
