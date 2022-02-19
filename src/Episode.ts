import { Funding, LiveItem, Podcast, SocialInteraction, Transcript, ValueTag } from ".";

export type Episode = {
  id: string
  alternateEnclosures: EpisodeAlternateEnclosure[]
  contentLinks: EpisodeContentLinks[]
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
  liveItem: LiveItem
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
  socialInteraction: SocialInteraction[] | null
  title?: string | null
  transcript: Transcript[] | null
  value: ValueTag[] | null
  podcast?: Podcast
}

export type EpisodeAlternateEnclosure = {
  _default?: boolean
  _length?: number
  bitrate?: number
  codecs?: string
  height?: number
  lang?: string
  rel?: string
  sources?: EpisodeAlternateEnclosureSource[]
  title?: string
  type: string
}

export type EpisodeAlternateEnclosureSource = {
  contentType?: string
  uri: string
}

export type EpisodeContentLinks = {
  href: string
  title?: string
}
