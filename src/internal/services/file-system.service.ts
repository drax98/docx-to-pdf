import { Readable, Writable } from 'stream';
import { Injectable } from '../dependency-injection/decorators/injectable';
import { inject } from 'tsyringe';
import { FilesystemToken } from '../dependency-injection/tokens';

@Injectable()
export class FileSystemService {
  constructor(
    @inject(FilesystemToken)
    private readonly fs: {
      createReadStream: (filePath: string) => Readable,
      createWriteStream: (filePath: string) => Writable,
      stat: (filePath: string, callback: (err: Error) => void) => void
    },
  ) {
  }

  exists(filePath: string): Promise<boolean> {
    return new Promise((resolve) => {
      this.fs.stat(filePath, (err: Error) => {
        if (err) {
          resolve(false);
        }
        resolve(true);
      });
    });
  }


  public createReadableStream(filePath: string): Readable {
    return this.fs.createReadStream(filePath);
  }
  public createWritableStream(filePath: string): Writable {
    return this.fs.createWriteStream(filePath);
  }

}
