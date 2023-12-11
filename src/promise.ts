// Helper function by salezica on Stack Overflow
// https://stackoverflow.com/a/43503921/2608858
export const promiseAllSkippingErrors = (promises: Promise<void>[]) => {
  return Promise.all(promises.map((p) => p.catch(() => null)))
}
