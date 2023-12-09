import { Playlist, UserHistoryItem, UserNowPlayingItem, UserQueueItem } from "."

export type User = {
  id: string
  addByRSSPodcastFeedUrls: string[]
  email: string
  freeTrialExpiration: Date | null
  isPublic: boolean
  membershipExpiration: Date | null
  name: string | null
  subscribedPlaylistIds: string[]
  subscribedPodcastIds: string[]
  subscribedUserIds: string[]
  playlists: Playlist[]
  userHistoryItems: UserHistoryItem[]
  userNowPlayingItem: UserNowPlayingItem
  userQueueItems: UserQueueItem[]
}
