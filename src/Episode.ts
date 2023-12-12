import { Author, Category, Funding, LiveItem, MediaRef, Podcast, SocialInteraction, Transcript, UserHistoryItem, UserNowPlayingItem, UserQueueItem, ValueTagExtended, ValueTagOriginal } from "."

// Keep this in sync with the Episode declared in podverse-orm entities/episode
export type Episode = {
  // ids
  id: string
  podcastId: string
  guid?: string | null

  // other props
  alternateEnclosures: EpisodeAlternateEnclosure[] | null
  chaptersType?: string | null
  chaptersUrl?: string | null
  chaptersUrlLastParsed: Date | null
  contentLinks: EpisodeContentLinks[] | null
  credentialsRequired: boolean
  description?: string | null
  duration?: number
  episodeType?: string | null
  funding: Funding[] | null
  imageUrl?: string | null
  isExplicit: boolean
  isPublic: boolean
  itunesEpisode?: number | null
  itunesEpisodeType?: string | null
  itunesSeason?: number | null
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
  socialInteraction: SocialInteraction[] | null
  subtitle?: string | null
  title?: string | null
  transcript: Transcript[] | null
  value: ValueTagOriginal[] | null

  // relationships
  authors?: Author[]
  categories?: Category[]
  liveItem?: LiveItem | null
  mediaRefs?: MediaRef[]
  podcast?: Podcast
  userHistoryItems?: UserHistoryItem[]
  userNowPlayingItems?: UserNowPlayingItem[]
  userQueueItems?: UserQueueItem[]

  // column dates
  createdAt: Date
  updatedAt: Date
}

export type EpisodeAlternateEnclosure = {
  _default?: boolean
  _length?: number
  bitrate?: number
  codecs?: string
  height?: number
  lang?: string
  rel?: string
  source?: EpisodeAlternateEnclosureSource[]
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
