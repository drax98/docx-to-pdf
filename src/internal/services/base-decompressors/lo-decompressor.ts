import { FileSystemService } from '../file-system.service';
import { TarDecompressor } from './tar.decompressor';
import { BrotliDecompressor } from './brotli.decompressor';
import { Injectable } from '../../dependency-injection/decorators/injectable';

@Injectable()
export class LODecompressor {
  constructor(
    private readonly fileSystemService: FileSystemService,
    private readonly brotliConverter: BrotliDecompressor,
    private readonly tarDecompressorConverter: TarDecompressor,
  ) {
  }

  async decompress(compressedFilePath: string, destination: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const stream = this.fileSystemService.createReadableStream(compressedFilePath)
        .pipe(this.brotliConverter.getConverter())
        .pipe(this.tarDecompressorConverter.getConverter(destination))

      stream.on('finish', () => resolve(destination));
      stream.on('error', (err) => reject(err));
    });


  }
}
