import { Injectable } from '../dependency-injection/decorators/injectable';
import { ChildProcess } from 'child_process';
import { inject } from 'tsyringe';
import { ChildProcessSpawnerToken } from '../dependency-injection/tokens';

@Injectable()
export class CommandExecuterService {

  constructor(
    @inject(ChildProcessSpawnerToken) private readonly spawn: (command: string, params: string[]) => ChildProcess,
  ) {
  }

  execute(command: string, params: string[]): ChildProcess {
    return this.spawn(`${command}`, params);
  }
}
