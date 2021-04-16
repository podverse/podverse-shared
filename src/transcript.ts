export type Transcript = {
  language?: string
  rel?: string
  type?: string
  url?: string
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
