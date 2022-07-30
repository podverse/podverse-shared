export const parseOpmlFile = (data: any, topLevel = false): string[] => {
  let outlineArr = data
  if (topLevel) {
    outlineArr = data.opml?.body[0]?.outline || []
  }

  const resultArr = new Array<string>()
  for (const item of outlineArr) {
    /*
      Exports from Podkicker don't include the type="rss" attribute,
      so if an xmlurl or xmlUrl is on item, then assume it is an rss feed url.
    */
    if (item.$?.type?.toLowerCase() === 'rss' || item.$?.xmlurl || item.$?.xmlUrl) {
      const url = item.$?.xmlurl || item.$?.xmlUrl
      const decodedUrl = decodeURIComponent(url)
      if (decodedUrl) {
        resultArr.push(decodedUrl)
      }
    } else {
      if (item.outline) {
        resultArr.push(...parseOpmlFile(item.outline))
      }
    }
  }

  return resultArr
}
