import 'reflect-metadata';
import { DocxToPdfConverter } from './internal/docx-to-pdf-converter';
import { container } from './internal/dependency-injection/container';
import { registerProviders } from './internal/dependency-injection/providers';

registerProviders();

export class Converter {
  private readonly docxToPdfConverter: DocxToPdfConverter;

  constructor() {
    this.docxToPdfConverter = container.resolve(DocxToPdfConverter);
  }

  convert(sourceFilePath: string, destinationFilePath: string) {
    return this.docxToPdfConverter.convert(sourceFilePath, destinationFilePath);
  }
}
