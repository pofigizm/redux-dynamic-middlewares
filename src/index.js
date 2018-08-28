import { compose } from 'redux'

const createDynamicMiddlewares = () => {
  let allDynamicMiddlewares = []

  const enhancer = store => next => (action) => {
    const chain = allDynamicMiddlewares.map(middleware => middleware(store))

    return compose(...chain)(next)(action)
  }

  const addMiddleware = (...middlewares) => {
    allDynamicMiddlewares = [...allDynamicMiddlewares, ...middlewares]
  }

  const removeMiddleware = (middleware) => {
    const index = allDynamicMiddlewares.findIndex(d => d === middleware)

    if (index === -1) {
      // eslint-disable-next-line no-console
      console.error('Middleware does not exist!', middleware)

      return
    }

    allDynamicMiddlewares = allDynamicMiddlewares.filter((_, mdwIndex) => mdwIndex !== index)
  }

  const resetMiddlewares = () => {
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
