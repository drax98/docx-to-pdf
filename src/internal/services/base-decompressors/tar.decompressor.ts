import { Writable } from 'stream';
import { ExtractOptions, Extract } from 'tar-fs';
import { Injectable } from '../../dependency-injection/decorators/injectable';
import { inject } from 'tsyringe';
import { TarDecompressToken } from '../../dependency-injection/tokens';

@Injectable()
export class TarDecompressor {
  constructor(
    @inject(TarDecompressToken) private readonly decompress: (cwd: string, opts?: ExtractOptions) => Extract,
  ) {
  }

  getConverter(destination: string): Writable {
    return this.decompress(destination);
  }
}
