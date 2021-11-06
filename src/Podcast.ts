import { Funding, ValueTag } from ".";

export type Podcast = {
  id: string
  podcastIndexId: string
  credentialsRequired: boolean
  description?: string
  funding: Funding[]
  guid?: string
  imageUrl?: string | null
  isExplicit: boolean
  language?: string
  lastEpisodePubDate?: Date | null
  lastEpisodeTitle?: string | null
  linkUrl?: string
  pastAllTimeTotalUniquePageviews: number
  pastHourTotalUniquePageviews: number
  pastDayTotalUniquePageviews: number
  pastWeekTotalUniquePageviews: number
  pastMonthTotalUniquePageviews: number
  pastYearTotalUniquePageviews: number
  shrunkImageUrl?: string | null
  title?: string | null
  type?: string | null
  value: ValueTag[] | null
}
