
export const addParameterToURL = (uri: string, param: string) => {
    uri += (uri.split('?')[1] ? '&' : '?') + param
    return uri
}

export const convertUrlToSecureHTTPS = (originalUrl: string) => {
  return originalUrl ? originalUrl.replace('http://', 'https://') : ''
}

export const createEmailLinkUrl = (obj: any) => {
  let str = 'mailto:' + obj.email + '?'
  str += encodeURI(obj.subject ? 'subject=' + obj.subject + '&' : '')
  str += encodeURI(obj.body ? 'body=' + obj.body : '')
  return str
}

export const generateQueryParams = (query: any) => {
  return Object.keys(query)
    .map((key) => {
      return `${key}=${query[key]}`
    })
    .join('&')
}

export const getExtensionFromUrl = (url: string) => {
  const path = url.split('?') // Remove query params

  if (path[0]) {
    const filePathArr = path[0].split('/') // Split url in paths
    if (filePathArr.length > 0) {
      const filePath = filePathArr.pop() || '' // Grab last path in url
      if (filePath) {
        const extension = filePath.split('.').pop() // Split last path in name.extension and grab extension
        return `.${extension || 'mp3'}`
      }
    }
  }

  return '.mp3' // If all else fails, assume mp3
}

// Function provided by Rems and mattdlockyer
// https://stackoverflow.com/questions/736513/how-do-i-parse-a-url-into-hostname-and-path-in-javascript
export const getLocationURL = (href: string) => {
  var match = href.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);
  return match && {
    href: href,
    protocol: match[1],
    host: match[2],
    hostname: match[3],
    port: match[4],
    pathname: match[5],
    search: match[6],
    hash: match[7]
  }
}

