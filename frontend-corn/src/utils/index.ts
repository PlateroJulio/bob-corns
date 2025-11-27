export const sleepFunc = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const minDelay = (promise: Promise<any>, ms: number) => {
  return Promise.all([
    promise,
    new Promise(resolve => setTimeout(resolve, ms))
  ]).then(([result]) => result)
}
