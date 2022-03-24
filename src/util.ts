import { decode } from 'html-entities'

export const decodeHtml = (html = '') => {
  return decode(html)
}
