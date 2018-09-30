import { compose } from 'redux'

const getDynamicMiddleware = () => {
  let allDynamicMiddlewares = []

  const dynamicMiddlewares = store => next => (action) => {
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
    dynamicMiddlewares,
    addMiddleware,
    removeMiddleware,
    resetMiddlewares
  }
}
export default getDynamicMiddleware;