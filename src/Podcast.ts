import { Author, Category, FeedUrl, Funding, PodcastMedium, ValueTagExtended, ValueTagOriginal } from "."
import { LiveItemStatus } from "./LiveItem"

export type Podcast = {
  // ids
  id: string
  int_id: number
  podcastIndexId?: string | null
  podcastGuid?: string | null
  guid?: string | null
  authorityId?: string | null

  // other props
  alwaysFullyParse?: boolean
  credentialsRequired: boolean
  description?: string | null
  embedApprovedMediaUrlPaths?: string | null
  excludeCacheBust?: boolean
  feedLastParseFailed?: boolean
  feedLastUpdated?: Date | null
  funding: Funding[] | null
  hasLiveItem: boolean
  hasPodcastIndexValueTag?: boolean
  hasSeasons: boolean
  hasVideo: boolean
  hideDynamicAdsWarning?: boolean
  imageUrl?: string | null
  isExplicit: boolean
  isPublic: boolean
  itunesFeedType: string
  language?: string | null
  lastEpisodePubDate?: Date | null
  lastEpisodeTitle?: string | null
  latestLiveItemStatus: LiveItemStatus
  linkUrl?: string | null
  medium: PodcastMedium
  parsingPriority: boolean
  pastAllTimeTotalUniquePageviews: number
  pastHourTotalUniquePageviews: number
  pastDayTotalUniquePageviews: number
  pastWeekTotalUniquePageviews: number
  pastMonthTotalUniquePageviews: number
  pastYearTotalUniquePageviews: number
  shrunkImageUrl?: string | null
  shrunkImageLastUpdated?: Date | null
  sortableTitle?: string | null
  subtitle?: string | null
  title?: string | null
  type?: string | null
  value: ValueTagOriginal[] | null
  
  // relationships
  authors?: Author[] | null
  categories?: Category[] | null
  feedUrls?: FeedUrl[]
  
  // column dates
  createdAt: Date
  updatedAt: Date
}

export const podcastItunesTypeDefaultValue = 'episodic'
