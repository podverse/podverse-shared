import { Author, Category, FeedUrl, Funding, PodcastMedium, ValueTagExtended } from "."
import { LiveItemStatus } from "./LiveItem"

export type Podcast = {
  // ids
  id: string
  podcastIndexId: string

  // other props
  credentialsRequired: boolean
  description?: string
  embedApprovedMediaUrlPaths?: string
  excludeCacheBust?: boolean
  feedUrls?: FeedUrl[]
  funding: Funding[]
  guid?: string
  hasLiveItem?: boolean
  hasPodcastIndexValueTag?: boolean
  hasSeasons: boolean
  hasVideo: boolean
  imageUrl?: string | null
  isExplicit: boolean
  itunesFeedType: string
  language?: string
  lastEpisodePubDate?: Date | null
  lastEpisodeTitle?: string | null
  latestLiveItemStatus: LiveItemStatus
  linkUrl?: string
  medium?: PodcastMedium
  pastAllTimeTotalUniquePageviews: number
  pastHourTotalUniquePageviews: number
  pastDayTotalUniquePageviews: number
  pastWeekTotalUniquePageviews: number
  pastMonthTotalUniquePageviews: number
  pastYearTotalUniquePageviews: number
  podcastGuid?: string
  shrunkImageUrl?: string | null
  subtitle?: string
  title?: string | null
  type?: string | null
  value: ValueTagExtended[] | null

  // relationships
  authors?: Author[] | null
  categories?: Category[] | null

  // column dates
  createdAt: Date
  updatedAt: Date
}

export const podcastItunesTypeDefaultValue = 'episodic'
