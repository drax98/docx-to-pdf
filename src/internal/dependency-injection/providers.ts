import { InjectionToken, Provider } from 'tsyringe';
import {
  BrotliDecompressToken, ChildProcessSpawnerToken,
  CurrentRootDir,
  FilesystemToken, LoArgsToken, LoCompressedPathToken,
  LoExecutablePathToken,
  TarDecompressToken,
} from './tokens';
import * as fs from 'fs';
import { container } from './container';
import { extract } from 'tar-fs';
import { createBrotliDecompress } from 'zlib';
import * as path from 'path';
import { spawn } from 'child_process';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const providers: { token: InjectionToken, provider: Provider }[] = [
  {
    token: CurrentRootDir,
    provider: { useValue: path.join(__dirname, './') },
  },
  {
    token: FilesystemToken,
    provider: { useValue: fs },
  },
  {
    token: TarDecompressToken,
    provider: { useValue: extract },
  },
  {
    token: BrotliDecompressToken,
    provider: { useValue: createBrotliDecompress },
  },
  {
    token: LoExecutablePathToken,
    provider: { useValue: path.join(__dirname, './instdir/program/soffice') },
  },
  {
    token: LoCompressedPathToken,
    provider: { useValue: path.join(__dirname, './bin/lo.tar.br') },
  },
  {
    token: ChildProcessSpawnerToken,
    provider: { useValue: spawn},
  },
  {
    token: LoArgsToken,
    provider: { useValue: ["--headless", "--invisible", "--nodefault", "--view", "--nolockcheck", "--nologo", "--norestore"] },
  },
];

export const registerProviders = (): void => {
  providers.forEach(entry => container.register(entry.token, entry.provider as any));
};
