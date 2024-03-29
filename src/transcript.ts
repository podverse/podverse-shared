import { decodeHTMLString, removeHTMLFromString } from "./htmlHelpers"
import { convertHHMMSSToSeconds, convertSecToHHMMSS } from "./timeHelpers"

export type Transcript = {
  language?: string
  rel?: string
  type: TranscriptType
  url: string
}

export type TranscriptRow = {
  line?: number
  startTime: number
  startTimeFormatted: string | null
  endTime: number
  endTimeFormatted: string | null
  body: string
  speaker?: string
}

export type TranscriptType = 
  'text/html'
  | 'application/json'
  | 'application/srt'
  | 'text/srt'
  | 'text/vtt'
  | 'application/x-subrip'

const convertJSONSRTItemToTranscriptRow = (item: any, line: number) => {
  const { body, endTime, startTime, speaker } = item
  if (!startTime && startTime !== 0) return null
  const startTimeFormatted = convertSecToHHMMSS(startTime)
  if (!endTime && endTime !== 0) return null
  const endTimeFormatted = convertSecToHHMMSS(endTime)

  return {
    line,
    startTime,
    startTimeFormatted,
    endTime,
    endTimeFormatted,
    speaker,
    body
  } as TranscriptRow
}

const convertParsedHTMLItemToTranscriptRow = (item: any, line: number) => {
  /*
    item[0] = full parsed as single line
    item[1] = speaker
    item[2] = start time
    item[3] = html body
  */
  const speaker = item[1]
  const startTime = convertTranscriptTimestampToSeconds(item[2])
  if (!startTime && startTime !== 0) return null
  const startTimeFormatted = convertSecToHHMMSS(startTime)
  const body = decodeHTMLString(item[3])

  return {
    line,
    startTime,
    startTimeFormatted,
    speaker,
    body
  } as TranscriptRow
}

const convertParsedSRTItemToTranscriptRow = (item: any) => {
  /*
    item[0] = full parsed as single line
    item[1] = line
    item[2] = start time
    item[3] = end time
    item[4] = speaker
    item[5] = speaker
    item[6] = body line 1
    item[7] = body line 2
  */

  const line = parseInt(item[1], 10)
  const startTime = convertTranscriptTimestampToSeconds(item[2])
  if (!startTime && startTime !== 0) return null
  const startTimeFormatted = convertSecToHHMMSS(startTime)
  const endTime = convertTranscriptTimestampToSeconds(item[3])
  if (!endTime && endTime !== 0) return null
  const endTimeFormatted = convertSecToHHMMSS(endTime)
  const speaker = item[4]
  let body = item[6]
  if (item[7]) body += ` ${item[7]}`

  return {
    line,
    startTime,
    startTimeFormatted,
    endTime,
    endTimeFormatted,
    speaker,
    body
  } as TranscriptRow
}

const convertParsedVTTItemToTranscriptRow = (item: any, line: number) => {
  /*
    item[0] = full parsed as single line
    item[1] = start time
    item[2] = end time
    item[3] = speaker
    item[4] = speaker
    item[5] = body line 1
    item[6] = body line 2
  */
  const startTime = convertTranscriptTimestampToSeconds(item[1])
  if (!startTime && startTime !== 0) return null
  const startTimeFormatted = convertSecToHHMMSS(startTime)
  const endTime = convertTranscriptTimestampToSeconds(item[2])
  if (!endTime && endTime !== 0) return null
  const endTimeFormatted = convertSecToHHMMSS(endTime)
  const speaker = item[3]
  let body = item[5]
  if (item[6]) body += ` ${item[6]}`

  return {
    line,
    startTime,
    startTimeFormatted,
    endTime,
    endTimeFormatted,
    speaker,
    body
  } as TranscriptRow
}

const convertTranscriptTimestampToSeconds = (timestamp: string) => {
  // SRT time stamps use this formatting: 00:02:45,170
  let hhmmss = timestamp.split(',')[0]
  // VTT time stamps use this formatting: 00:02:45.170
  hhmmss = timestamp.split('.')[0]
  return convertHHMMSSToSeconds(hhmmss)
}

export const getTranscriptForLocale = (transcripts: Transcript[], locale: string) => {
  let transcript = null
  
  if (transcripts?.length > 0 && locale) {
    transcript = transcripts.find((t: Transcript) => t.language === locale)

    if (!transcript) {
      const baseLanguageArray = locale.split('-')
      const baseLanguage = baseLanguageArray[0]
      transcript = transcripts.find((t: Transcript) => t.language?.startsWith(baseLanguage))
    }

    if (!transcript) {
      transcript = transcripts[0]
    }
  }

  return transcript
}

const parseHTMLFile = (data: string) => {
  data = (data && data.trim()) || ''
  // eslint-disable-next-line max-len
  const pattern = /\x3ccite\x3e(.+?)\x3a\x3c\x2fcite\x3e\n\s{1,}?\x3ctime\x3e([0-9\x3a\x2c]{1,12})\x3c\x2ftime\x3e\n\s{1,}?\x3cp\x3e(.+?)\x3c\x2fp\x3e/gim
  let matches

  const result = [] as TranscriptRow[]
  data = data.replace(/\r\n|\r|\n/g, '\n')

  let index = 0
  while ((matches = pattern.exec(data)) !== null) {
    const item = convertParsedHTMLItemToTranscriptRow(matches, index)
    index++
    if (item) result.push(item)
  }

  /*
    If a text/html file does not have parsable fields, but it has contents,
    then convert it into a single row that starts at 0 seconds.
  */
  if (result.length === 0 && data) {
    const speaker = ''
    const startTime = '00:00:00,000'
    const index = 0
    const strippedHtml = removeHTMLFromString(data)
    const htmlItem = convertParsedHTMLItemToTranscriptRow([
      data,
      speaker,
      startTime,
      strippedHtml
    ], index)
    if (htmlItem) result.push(htmlItem)
  }

  return result
}

const parseJSONFile = (data: any) => {
  const { segments } = data
  const result = [] as TranscriptRow[]

  if (Array.isArray(segments)) {
    for (let i = 0; i < segments.length; i++) {
      const item = convertJSONSRTItemToTranscriptRow(segments[i], i)
      if (item) result.push(item)
    }
  }

  return result
}

const parseSRTFile = (data: string) => {
  const pattern = /(\d{1,})\n([0-9\x3a\x2c]{12})\s\x2d\x2d\x3e\s([0-9\x3a\x2c]{12})\n((.+?)\x3a\s)?(.*)\n(.*)\n/gim
  let matches

  const result = [] as TranscriptRow[]
  data = data.replace(/\r\n|\r|\n/g, '\n')

  while ((matches = pattern.exec(data)) !== null) {
    const item = convertParsedSRTItemToTranscriptRow(matches)
    if (item) result.push(item)
  }

  return result
}

export const parseTranscriptFile = (data: any, transcriptType: TranscriptType) => {
  if (!data) return []

  let parsedTranscript = [] as TranscriptRow[]

  if (transcriptType === 'application/json') {
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data)
      } catch (error) {
        //
      }
    }
    parsedTranscript = parseJSONFile(data)
  } else if (transcriptType === 'application/srt' || transcriptType === 'text/srt' || transcriptType === 'application/x-subrip') {
    parsedTranscript = parseSRTFile(data)
  } else if (transcriptType === 'text/html') {
    // parseHTMLFile isn't working for at least this RSS feed https://feeds.buzzsprout.com/1.rss
    parsedTranscript = parseHTMLFile(data)
  } else if (transcriptType === 'text/vtt') {
    parsedTranscript = parseVTTFile(data)
  }

  return parsedTranscript
}

const parseVTTFile = (data: string) => {
  const pattern = /([0-9\x3a\x2e]{12})\s\x2d\x2d\x3e\s([0-9\x3a\x2e]{12})\n((.+?)\x3a\s)?(.*)\n(.*)\n\n/gim
  let matches

  const result = [] as any[]
  data = data.replace(/\r\n|\r|\n/g, '\n')

  let index = 0
  while ((matches = pattern.exec(data)) !== null) {
    const item = convertParsedVTTItemToTranscriptRow(matches, index)
    index++
    if (item) result.push(item)
  }

  return result
}
