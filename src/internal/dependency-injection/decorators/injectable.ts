import { Lifecycle, scoped } from 'tsyringe';

export function Injectable() {
  return <T extends { new(...constructorArgs: any[]): any }>(constructorFunction: T): any => {
    scoped(Lifecycle.ContainerScoped)(constructorFunction);
    return constructorFunction;
  };
}
