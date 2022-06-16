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

export type TranscriptType = 'text/html' | 'application/srt' | 'text/srt' | 'text/vtt' | 'application/json'

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
