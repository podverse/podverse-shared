export const getUsernameAndPasswordFromCredentials = (credentials: string) => {
  let username = ''
  let password = ''

  if (credentials) {
    const splitCredentials = credentials.split(':')
    username = splitCredentials[0] || ''
    password = splitCredentials[1] || ''
  }

  return {
    username,
    password
  }
}
