import { Author, Category, FeedUrl, Funding, ValueTag } from ".";
import { LiveItemStatus } from "./LiveItem";

export type Podcast = {
  id: string
  podcastIndexId: string
  credentialsRequired: boolean
  description?: string
  embedApprovedMediaUrlPaths?: string
  feedUrls?: FeedUrl[]
  funding: Funding[]
  guid?: string
  hasLiveItem?: boolean
  hasPodcastIndexValueTag?: boolean
  hasSeasons: boolean
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
  value: ValueTag[] | null
  authors?: Author[] | null
  categories?: Category[] | null
}

export type PodcastMedium = 'podcast' | 'music' | 'video' | 'film' | 'audiobook' | 'newsletter' | 'blog' | 'music-video'
