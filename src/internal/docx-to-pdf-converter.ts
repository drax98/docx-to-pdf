import { injectable } from 'tsyringe';
import { LibreofficeRunnerService } from './services/libreoffice-runner.service';

@injectable()
export class DocxToPdfConverter {
  constructor(
    private readonly libreOfficeRunner: LibreofficeRunnerService,
  ) {
  }

  async convert(sourceFilePath: string, destinationFilePath: string): Promise<boolean> {
    await this.libreOfficeRunner.convertToPdf(sourceFilePath, destinationFilePath);
    return true;
  }
}
