import { Episode, ParsedEpisode } from ".";

export type LiveItemStatus = 'pending' | 'live' | 'ended' | 'none'

export type LiveItem = {
  status: LiveItemStatus
  start: Date
  end: Date | null
  episode: Episode
}

export const parseLatestLiveItemStatus = (parsedLiveItemEpisodes: ParsedEpisode[]) => {
  let latestLiveItemStatus = 'none' as LiveItemStatus
  for (const parsedLiveItemEpisode of parsedLiveItemEpisodes) {
    if (parsedLiveItemEpisode.liveItemStatus === 'live') {
      latestLiveItemStatus = 'live'
      break
    } else if (
      parsedLiveItemEpisode.liveItemStatus === 'pending'
      && latestLiveItemStatus !== 'live'
    ) {
      latestLiveItemStatus = 'pending'
    } else if (
      parsedLiveItemEpisode.liveItemStatus === 'ended'
      && latestLiveItemStatus !== 'live'
      && latestLiveItemStatus !== 'pending'
    ) {
      latestLiveItemStatus = 'ended'
    }
  }
  return latestLiveItemStatus
}

export const parseLatestLiveItemPubDateAndTitle = (parsedLiveItemEpisodes: ParsedEpisode[]) => {
  let liveItemLatestPubDate = null
  let liveItemTitle = ''
  for (const parsedLiveItemEpisode of parsedLiveItemEpisodes) {
    if (
      parsedLiveItemEpisode.liveItemStatus === 'live'
      && (
        !liveItemLatestPubDate
        || new Date(parsedLiveItemEpisode.liveItemStart as any) > new Date(liveItemLatestPubDate)
      )
    ) {
      liveItemLatestPubDate = parsedLiveItemEpisode.liveItemStart
      liveItemTitle = parsedLiveItemEpisode.title || 'Untitled Livestream'
    }
  }
  return { liveItemLatestPubDate, liveItemTitle }
}
