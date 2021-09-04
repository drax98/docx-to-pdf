import { Lifecycle, scoped } from 'tsyringe';

export function Injectable<Y>() {
  return <T extends { new(...constructorArgs: unknown[]): Y}>(constructorFunction: T): T => {
    scoped(Lifecycle.ContainerScoped)(constructorFunction);
    return constructorFunction;
  };
}
