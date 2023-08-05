export const checkIfContainsStringMatch = (matchStr: string, currentStr: string) => {
  const lowercaseString = matchStr.toLowerCase()
  const regex = new RegExp(`${lowercaseString}|${lowercaseString}.|.${lowercaseString}.|.${lowercaseString}`)
  return regex.test(currentStr?.toLowerCase() || '')
}

export const hasAtLeastXCharacters = (str?: string, x = 8) => {
  return str && str.match(`^(?=.{${x},})`) ? true : false
}

export const hasLowercase = (str?: string) => {
  return str && str.match('^(?=.*[a-z])') ? true : false
}

export const hasMatchingStrings = (str1?: string, str2?: string) => {
  return str1 && str1 === str2 ? true : false
}

export const hasNumber = (str?: string) => {
  return str && str.match('^(?=.*[0-9])') ? true : false
}

export const hasUppercase = (str?: string) => {
  return str && str.match('^(?=.*[A-Z])') ? true : false
}

export const isOdd = (num: number) => num % 2 === 1

export const isValidDate = (date: any) => date instanceof Date && !isNaN(date as any)

export const isValidUrl = (str?: string) => {
  const regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/
  return str ? regex.test(str) : false
}
