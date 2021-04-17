export type Transcript = {
  language?: string
  rel?: string
  type: TranscriptType
  url: string
}

export type TranscriptRow = {
  line: number
  startTime: number
  startTimeHHMMSS: string | null
  endTime: number
  endTimeHHMMSS: string | null
  text: string
  speaker?: string
}

export type TranscriptType = 'text/html' | 'application/srt' | 'text/vtt' | 'application/json'
