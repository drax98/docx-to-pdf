import { Injectable } from '../dependency-injection/decorators/injectable';
import { CommandExecuterService } from './command-executer.service';
import { LoExecutableGetter } from './lo-executable-getter';
import { inject } from 'tsyringe';
import { LoArgsToken } from '../dependency-injection/tokens';
import * as path from 'path';

@Injectable()
export class LibreofficeRunnerService {
  constructor(
    private readonly loExecutableGetter: LoExecutableGetter,
    private readonly commandExecuter: CommandExecuterService,
    @inject(LoArgsToken) private readonly libreOfficeArgs: string[],
  ) {
  }

  async convertToPdf(docxFilePath: string, pdfDestinationPath: string) {
    const absoluteDocxFilePath = path.resolve(docxFilePath);
    const absoluteDestinationDirectory = path.resolve(pdfDestinationPath);
    const splitDestinationPath = path => [...path.matchAll(/(.*\/)*([ \w-]+\.pdf)/gm)][0];

    const executablePath = await this.loExecutableGetter.getExecutablePath();
    const splittedDestination = splitDestinationPath(absoluteDestinationDirectory);
    const destinationDirectory = (!!splittedDestination[1] && splittedDestination[1].slice(0, -1)) || '/temp';
    const destinationName = splittedDestination[2];
    await this.runConvertingProcess(executablePath, absoluteDocxFilePath, destinationDirectory, destinationName);
  }

  private runConvertingProcess(executablePath: string, docxFilePath: string, pdfDestinationFolderPath: string, pdfName: string) {
    console.log([
      ...this.libreOfficeArgs,
      '--convert-to', `${pdfName}`,
      '--outdir', `${pdfDestinationFolderPath}`,
      `${docxFilePath}`,
    ]);
    return new Promise((resolve, reject) => {
      const process = this.commandExecuter.execute(
        executablePath,
        [
          ...this.libreOfficeArgs,
          '--convert-to', `${pdfName}`,
          '--outdir', `${pdfDestinationFolderPath}`,
          `${docxFilePath}`,
        ],
      );

      process.on('close', (code) => {
        resolve(code);
      });

      process.on('error', (err) => {
        reject(err);
      });
    });

  }
}
