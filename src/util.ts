import { addParameterToURL } from "./urls"

export const checkIfIdMatchesClipIdOrEpisodeIdOrAddByUrl = (
  id?: string,
  clipId?: string,
  episodeId?: string,
  addByRSSPodcastFeedUrl?: string
) => {
  let matches = false

  if (addByRSSPodcastFeedUrl) {
    matches = addByRSSPodcastFeedUrl === id
  } else if (clipId) {
    matches = clipId === id
  } else if (episodeId) {
    matches = episodeId === id
  }

  return matches
}

export const convertBytesToHumanReadableString = (bytes: number) => {
  const thresh = 1000
  if (Math.abs(bytes) < thresh) {
    return bytes + ' B'
  }
  const units = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  let u = -1
  do {
    bytes /= thresh
    ++u
  } while (Math.abs(bytes) >= thresh && u < units.length - 1)
  return bytes.toFixed(1) + ' ' + units[u]
}

export const encodeSpacesInString = (str: string) => {
  return str.replace(/ /g, '%20')
}

export const numberWithCommas = (x?: number) => {
  if (!x || x === 0) return x
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const overrideImageUrlWithChapterImageUrl = (nowPlayingItem: any, currentChapter: any) => {
  let imageUrl = nowPlayingItem ? nowPlayingItem.podcastImageUrl : ''
  if (nowPlayingItem && !nowPlayingItem.clipId && currentChapter && currentChapter.imageUrl) {
    imageUrl = currentChapter.imageUrl
  }
  return imageUrl
}

export const parseCommaDelimitedNamesAndURLsString = (str: string) => {
  if (!str) return []

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

export const removeArticles = (str: string) => {
  const words = str.split(' ')
  if (words.length <= 1) return str
  if (words[0] === 'a' || words[0] === 'the' || words[0] === 'an') {
    return words.splice(1).join(' ')
  }
  return str
}

export const capitalizeFirstLetter = (str: string) => {
  str = str || ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const convertToSlug = (str: string) => str.replace(/\s+/g, '-').toLowerCase().replace(/\W/g, '').trim()

export const convertToSortableTitle = (title: string) => {
  const sortableTitle = title
    ? title
        .toLowerCase()
        .replace(/\b^the\b|\b^a\b|\b^an\b/i, '')
        .trim()
    : ''
  return sortableTitle ? sortableTitle.replace(/#/g, '') : ''
}

export const checkIfVideoMediaType = (str: string) => {
  return str && (
    str.toLowerCase().indexOf('video') >= 0
    || str.toLowerCase().indexOf('application/x-mpegurl') >= 0
  ) 
}

export const removeAllSpaces = (str: string) => {
  str = str.replace(/%20/g, ' ')
  str = str.replace(/\s/g, '')
  return str
}

export const addCacheBustUrlParameter = (url: string, excludeCacheBust?: boolean) => {
  return !excludeCacheBust
  ? addParameterToURL(url, `cacheBust=${Date.now()}`)
  : url
}

export const createAbortController = () => {
  const abortTimeLimit = 60000
  const abortController = new AbortController()
  const abortTimeout = setTimeout(() => {
    abortController.abort()
  }, abortTimeLimit)
  return { abortController, abortTimeout }
}

export type AbortAPI = {
  abortController: AbortController
  abortTimeout: NodeJS.Timeout
}

export const chunkArray = (arr: any[], chunkSize = 10) => {
  let i
  let j
  const chunks: any[] = []
  for (i = 0, j = arr.length; i < j; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize) as never // TODO: What does this mean?
    chunks.push(chunk)
  }
  return chunks
}

export const parseIntOrDefault = (str?: string, def?: number): number | null => {
  let val = typeof def === 'number' ? def : null
  if (str) {
    const parsedInt = parseInt(str, 10)
    if (!Number.isNaN(parsedInt)) {
      val = parsedInt
    }
  }
  return val
}

export const offsetDate = (minutesOffset = 0) => {
  const todayDate = new Date()
  todayDate.setMinutes(todayDate.getMinutes() - todayDate.getTimezoneOffset() + minutesOffset)
  return todayDate.toISOString().slice(0, 10)
}

export const splitDateIntoEqualIntervals = (startDate: Date, endDate: Date, numberOfIntervals: number) => {
  const intervalLength = (endDate.getTime() - startDate.getTime()) / numberOfIntervals
  return [...new Array(numberOfIntervals)].map((e, i) => {
    return {
      start: new Date(startDate.getTime() + i * intervalLength),
      avg: new Date(startDate.getTime() + (i + 0.5) * intervalLength),
      end: new Date(startDate.getTime() + (i + 1) * intervalLength)
    }
  })
}

// TODO: how do we get rid of addDays from the prototype?
// eslint-disable-next-line
// @ts-ignore
Date.prototype.addDays = function (days) {
  const date = new Date(this.valueOf())
  date.setDate(date.getDate() + days)
  return date
}

export const isBeforeDate = (expirationDate: Date, dayOffset = 0) => {
  const currentDate = new Date() as any

  const offsetDate = currentDate.addDays(dayOffset)
  return new Date(expirationDate) > offsetDate
}
