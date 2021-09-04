import { Injectable } from '../dependency-injection/decorators/injectable';
import { LODecompressor } from './base-decompressors/lo-decompressor';
import { FileSystemService } from './file-system.service';
import { inject } from 'tsyringe';
import { CurrentRootDir, LoCompressedPathToken, LoExecutablePathToken } from '../dependency-injection/tokens';

@Injectable()
export class LoExecutableGetter {
  constructor(
    private readonly loDecompressor: LODecompressor,
    private readonly fileSystemService: FileSystemService,
    @inject(CurrentRootDir) private readonly currentDir: string,
    @inject(LoExecutablePathToken) private readonly loExecutablePath: string,
    @inject(LoCompressedPathToken) private readonly loCompressedPath: string,
  ) {
  }

  async getExecutablePath(): Promise<string> {
    await this.prepareBinary();
    return this.loExecutablePath;
  }

  private async prepareBinary(): Promise<void> {
    const loExists = await this.fileSystemService.exists(this.loExecutablePath);
    if (loExists) {
      return;
    }
    await this.loDecompressor.decompress(this.loCompressedPath, this.currentDir);
  }
}
