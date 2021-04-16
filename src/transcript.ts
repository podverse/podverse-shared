export type Transcript = {
  language?: string
  rel?: string
  type?: string
  value?: string
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
