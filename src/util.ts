import { decode } from 'html-entities'

export const decodeHtml = (html = '') => {
  return decode(html)
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

export const parseCommaDelimitedNamesAndURLsString = (str: string) => {
  const arr = str.split(',')
  const persons = arr.map((str: string) => {
    let name = ''
    let url = ''
    if (str.indexOf('<') && str.indexOf('>') > str.indexOf('<')) {
      name = str.substring(0, str.indexOf('<'))
      url = str.substring(str.indexOf('<') + 1, str.indexOf('>'))
    } else {
      name = str
    }

    return { name, url }
  })

  return persons
}
