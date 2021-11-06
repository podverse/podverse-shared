import { Funding, Podcast, Transcript, ValueTag } from ".";

export type Episode = {
  id: string
  credentialsRequired: boolean
  description?: string | null
  duration?: number
  episodeType?: string | null
  funding: Funding[] | null
  guid?: string | null
  imageUrl?: string | null
  isExplicit: boolean
  isPublic: boolean
  linkUrl?: string | null
  mediaFilesize: number
  mediaType?: string | null
  mediaUrl: string
  pastAllTimeTotalUniquePageviews: number
  pastHourTotalUniquePageviews: number
  pastDayTotalUniquePageviews: number
  pastWeekTotalUniquePageviews: number
  pastMonthTotalUniquePageviews: number
  pastYearTotalUniquePageviews: number
  pubDate?: Date | null
  title?: string | null
  transcript: Transcript[] | null
  value: ValueTag[] | null
  podcast?: Podcast
}
