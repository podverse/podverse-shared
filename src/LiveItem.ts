import { Episode, ParsedEpisode } from "."

export type LiveItemStatus = 'pending' | 'live' | 'ended' | 'none'

export const liveItemStatuses = ['live', 'pending', 'ended']

export type LiveItem = {
  status: LiveItemStatus
  start: Date
  end: Date | null
  episode: Episode
  chatIRCURL: string | null
}

export type ParsedLiveItem = {
  chat?: string
  episode: ParsedEpisode
  end?: Date | null
  start?: Date
  status?: LiveItemStatus
}

export const parseLatestLiveItemStatus = (parsedLiveItems: ParsedLiveItem[]) => {
  let latestLiveItemStatus = 'none' as LiveItemStatus
  for (const parsedLiveItem of parsedLiveItems) {
    const liveItemStatus = parsedLiveItem.status?.toLowerCase()
    if (liveItemStatus === 'live') {
      latestLiveItemStatus = 'live'
      break
    } else if (
      liveItemStatus === 'pending'
      && latestLiveItemStatus !== 'live'
    ) {
      latestLiveItemStatus = 'pending'
    } else if (
      liveItemStatus === 'ended'
      && latestLiveItemStatus !== 'live'
      && latestLiveItemStatus !== 'pending'
    ) {
      latestLiveItemStatus = 'ended'
    }
  }
  return latestLiveItemStatus
}

export const parseLatestLiveItemInfo = (parsedLiveItems: ParsedLiveItem[]) => {
  let liveItemLatestPubDate = null
  let liveItemLatestTitle = ''
  let liveItemLatestImageUrl = ''
  for (const parsedLiveItem of parsedLiveItems) {
    const liveItemStatus = parsedLiveItem.status?.toLowerCase()
    if (
      liveItemStatus === 'live'
      && (
        !liveItemLatestPubDate
        || new Date(parsedLiveItem.start as any) > new Date(liveItemLatestPubDate)
      )
    ) {
      liveItemLatestPubDate = parsedLiveItem.start
      liveItemLatestTitle = parsedLiveItem.episode.title || 'Untitled Livestream'
      liveItemLatestImageUrl = parsedLiveItem.episode.imageURL || ''
    }
  }
  return { liveItemLatestImageUrl, liveItemLatestPubDate, liveItemLatestTitle }
}
