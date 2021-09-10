import { Middleware } from 'redux';

export interface DynamicMiddlewares {
  enhancer: Middlware,
  addMiddleware: (...middlewares: Middleware[]) => void,
  removeMiddleware: (middleware: Middleware) => void,
  resetMiddlewares: () => void,
}

export function createDynamicMiddlewares(): DynamicMiddlewares;

declare const dynamicMiddewaresInstance: DynamicMiddlewares;

export default dynamicMiddewaresInstance.enhancer;

export const {
  addMiddleware,
  removeMiddleware,
  resetMiddlewares,
} = dynamicMiddewaresInstance;

export {
  createDynamicMiddlewares,
};
