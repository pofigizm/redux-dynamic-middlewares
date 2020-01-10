import { compose } from 'redux'

const createDynamicMiddlewares = () => {
  let allDynamicMiddlewares = []
  let allApplyedDynamicMiddlewares = []
  let store

  const enhancer = (_store) => {
    store = _store
    return next => (action) => {
      return compose(...allApplyedDynamicMiddlewares)(next)(action)
    }
  }

  const addMiddleware = (...middlewares) => {
    allApplyedDynamicMiddlewares.push(...middlewares.map(middleware => middleware(store)))
    allDynamicMiddlewares.push(...middlewares)
  }

  const removeMiddleware = (middleware) => {
    const index = allDynamicMiddlewares.findIndex(d => d === middleware)

    if (index === -1) {
      // eslint-disable-next-line no-console
      console.error('Middleware does not exist!', middleware)

      return
    }

    allDynamicMiddlewares = allDynamicMiddlewares.filter((_, mdwIndex) => mdwIndex !== index)
    allApplyedDynamicMiddlewares = allApplyedDynamicMiddlewares
      .filter((_, mdwIndex) => mdwIndex !== index)
  }

  const resetMiddlewares = () => {
    allApplyedDynamicMiddlewares = []
    allDynamicMiddlewares = []
  }

  return {
    enhancer,
    addMiddleware,
    removeMiddleware,
    resetMiddlewares,
  }
}

const dynamicMiddlewaresInstance = createDynamicMiddlewares()

export default dynamicMiddlewaresInstance.enhancer

export const {
  addMiddleware,
  removeMiddleware,
  resetMiddlewares,
} = dynamicMiddlewaresInstance

export {
  createDynamicMiddlewares,
}
