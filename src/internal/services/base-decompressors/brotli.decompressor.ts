import { Duplex } from 'stream';
import { Injectable } from '../../dependency-injection/decorators/injectable';
import { inject } from 'tsyringe';
import { BrotliDecompressToken } from '../../dependency-injection/tokens';

@Injectable()
export class BrotliDecompressor {
  constructor(
    @inject(BrotliDecompressToken) private readonly decompressMethod: () => Duplex,
  ) {
  }

  getConverter(): Duplex {
    return this.decompressMethod();
  }

}
