export type AbortAPI = {
  abortController: AbortController
  abortTimeout: NodeJS.Timeout
}

export const generateAbortAPI = () => {
  const abortController = new AbortController()
  const abortTimeLimit = 60000
  const abortTimeout = setTimeout(() => {
    abortController.abort()
  }, abortTimeLimit)
  return { abortController, abortTimeout }
}
