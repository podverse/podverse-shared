import he from 'he'

const checkIfStringContainsHTMLTags = (text: string) => {
  if (text) {
    // eslint-disable-next-line max-len
    return /<(br|basefont|hr|input|source|frame|param|area|meta|!--|col|link|option|base|img|wbr|!DOCTYPE).*?>|<(a|abbr|acronym|address|applet|article|aside|audio|b|bdi|bdo|big|blockquote|body|button|canvas|caption|center|cite|code|colgroup|command|datalist|dd|del|details|dfn|dialog|dir|div|dl|dt|em|embed|fieldset|figcaption|figure|font|footer|form|frameset|head|header|hgroup|h1|h2|h3|h4|h5|h6|html|i|iframe|ins|kbd|keygen|label|legend|li|map|mark|menu|meter|nav|noframes|noscript|object|ol|optgroup|output|p|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|small|span|strike|strong|style|sub|summary|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|track|tt|u|ul|var|video).*?<\/\2>/i.test(
      text
    )
  }
  return false
}

export const decodeHTMLString = (text: string) => {
  if (text) {
    const limitSingleSpaceRegex = /\s+/g
    const newString = text.replace(limitSingleSpaceRegex, ' ')
    return he.decode(newString)
  }
  return text
}

export const filterHTMLElementsFromString = (html: string) => {
  if (html) {
    // eslint-disable-next-line max-len
    const finalHtml = html.replace(
      /<audio.*>.*?<\/audio>|<video.*>.*?<\/video>|<iframe.*>.*?<\/iframe>|<img.*>.*?<\/img>|<img.*?\/>|<img>/gi,
      ''
    )
    return finalHtml
  }
  return html
}

export const removeExtraInfoFromEpisodeDescription = (html: string) => {
  html = html.replace('<p>Episode Summary</p>', '')
  return html.replace(/<p>\s*<\/p>/, '')
}

export const removeHTMLFromString = (text: string) => {
  if (text) {
    const htmlEntitiesRegex = /<[^>]*>?/gm
    text = text.replace(htmlEntitiesRegex, '')
  }
  return text
}

export const replaceLinebreaksWithBrTags = (text: string) => {
  if (text && !checkIfStringContainsHTMLTags(text)) {
    const linebreaksRegex = /(?:\r\n|\r|\n)/g
    text = text.replace(linebreaksRegex, '<br>')
  }
  return text
}

export const removeLinebreaks = (text: string) => {
  if (text) {
    const linebreaksRegex = /(?:\r\n|\r|\n)/g
    text = text.replace(linebreaksRegex, ' ')
  }
  return text
}
