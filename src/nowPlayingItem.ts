import { Transcript, TranscriptRow } from './transcript'

export type NowPlayingItem = {
  addByRSSPodcastFeedUrl?: string
  clipEndTime?: number
  clipId?: string
  clipIsOfficialChapter?: boolean
  clipIsOfficialSoundBite?: boolean
  clipStartTime?: number
  clipTitle?: string
  episodeChaptersUrl?: string
  episodeDescription?: string
  episodeDuration?: number
  episodeFunding?: any
  episodeId?: string
  episodeImageUrl?: string
  episodeLinkUrl?: string
  episodeMediaUrl?: string
  episodePubDate?: string
  episodeTitle?: string
  episodeTranscript?: Transcript
  episodeValue?: any
  isPublic?: boolean
  ownerId?: string
  ownerIsPublic?: boolean
  ownerName?: string
  podcastFunding?: any
  podcastHideDynamicAdsWarning?: boolean
  podcastId?: string
  podcastImageUrl?: string
  podcastIndexPodcastId?: string
  podcastIsExplicit?: boolean
  podcastLinkUrl?: string
  podcastShrunkImageUrl?: string
  podcastSortableTitle?: string
  podcastTitle?: string
  podcastValue?: any
  userPlaybackPosition?: number
}

/* 
  Always call cleanNowPlayingItem before loading nowPlayingItem into player state.
*/
export const cleanNowPlayingItem = (item: any) => {
  let cleanedItem = {}

  if (item.clipId) {
    cleanedItem = {
      ...cleanedItem,
      clipEndTime: item.clipEndTime || null,
      clipId: item.clipId || '',
      clipIsOfficialChapter: item.clipIsOfficialChapter || false,
      clipIsOfficialSoundBite: item.clipIsOfficialSoundBite || false,
      clipStartTime: item.clipStartTime || 0,
      clipTitle: item.clipTitle || '',
    }
  }

  if (item.ownerId) {
    cleanedItem = {
      ...cleanedItem,
      ownerId: item.ownerId || '',
      ownerIsPublic: item.ownerIsPublic || false,
      ownerName: item.ownerName || ''
    }
  }

  return {
    ...cleanedItem,
    addByRSSPodcastFeedUrl: item.addByRSSPodcastFeedUrl || '',
    episodeChaptersUrl: item.episodeChaptersUrl || '',
    episodeDescription: item.episodeDescription || '',
    episodeDuration: item.episodeDuration || null,
    episodeFunding: parseProp(item, 'episodeFunding', []),
    episodeId: item.episodeId || '',
    episodeImageUrl: item.episodeImageUrl || '',
    episodeLinkUrl: item.episodeLinkUrl || '',
    episodeMediaUrl: item.episodeMediaUrl || '',
    ...(item.episodePubDate ? { episodePubDate: item.episodePubDate } : {}),
    episodeTitle: item.episodeTitle || '',
    episodeTranscript: parseProp(item, 'episodeTranscript', []),
    episodeValue: parseProp(item, 'episodeValue', []),
    isPublic: item.isPublic || false,
    podcastFunding: parseProp(item, 'podcastFunding', []),
    podcastHideDynamicAdsWarning: item.podcastHideDynamicAdsWarning || false,
    podcastId: item.podcastId || '',
    podcastImageUrl: item.podcastImageUrl || '',
    podcastIndexPodcastId: item.podcastIndexPodcastId || '',
    podcastIsExplicit: item.podcastIsExplicit || false,
    podcastLinkUrl: item.podcastLinkUrl || '',
    podcastShrunkImageUrl: item.podcastShrunkImageUrl || '',
    podcastSortableTitle: item.podcastSortableTitle || '',
    podcastTitle: item.podcastTitle || '',
    podcastValue: parseProp(item, 'podcastValue', []),
    userPlaybackPosition: !item.userPlaybackPosition && item.userPlaybackPosition !== 0
      ? 0
      : item.userPlaybackPosition
  }
}

const parseProp = (item: any, key: string, defaultValue: any) => {
  let val = defaultValue
  item = item || {}
  if (typeof item === 'object' && item[key]) {
    try {
      val = JSON.parse(item[key])
    } catch (error) {
      console.log(`parseProp ${key} error`, error)
    }
  }
  return val
}

export const convertNowPlayingItemToEpisode = (item: NowPlayingItem) => {
  return {
    chaptersUrl: item.episodeChaptersUrl,
    description: item.episodeDescription,
    duration: item.episodeDuration,
    funding: parseProp(item, 'episodeFunding', []),
    id: item.episodeId,
    linkUrl: item.episodeLinkUrl,
    mediaUrl: item.episodeMediaUrl,
    pubDate: item.episodePubDate,
    title: item.episodeTitle,
    transcript: parseProp(item, 'episodeTranscript', []),
    value: parseProp(item, 'episodeValue', []),
    podcast: {
      addByRSSPodcastFeedUrl: item.addByRSSPodcastFeedUrl,
      funding: parseProp(item, 'podcastFunding', []),
      hideDynamicAdsWarning: item.podcastHideDynamicAdsWarning,
      id: item.podcastId,
      imageUrl: item.podcastImageUrl,
      isExplicit: item.podcastIsExplicit,
      linkUrl: item.podcastLinkUrl,
      podcastIndexId: item.podcastIndexPodcastId,
      shrunkImageUrl: item.podcastShrunkImageUrl,
      sortableTitle: item.podcastSortableTitle,
      title: item.podcastTitle,
      value: parseProp(item, 'podcastValue', [])
    }
  }
}

export const convertNowPlayingItemToMediaRef = (item: NowPlayingItem = {}) => {
  return {
    endTime: item.clipEndTime,
    episode: convertNowPlayingItemToEpisode(item),
    id: item.clipId,
    isOfficialChapter: item.clipIsOfficialChapter,
    isOfficialSoundBite: item.clipIsOfficialSoundBite,
    isPublic: item.isPublic,
    startTime: item.clipStartTime,
    title: item.clipTitle,
    owner: {
      id: item.ownerId,
      isPublic: item.ownerIsPublic,
      name: item.ownerName
    }
  }
}

export const convertNowPlayingItemClipToNowPlayingItemEpisode = (
  data: any,
  userPlaybackPosition = 0
) => {
  return {
    addByRSSPodcastFeedUrl: data.addByRSSPodcastFeedUrl,
    episodeChaptersUrl: data.episodeChaptersUrl,
    episodeDescription: data.episodeDescription,
    episodeDuration: data.episodeDuration,
    episodeFunding: parseProp(data, 'episodeFunding', []),
    episodeId: data.episodeId,
    episodeLinkUrl: data.episodeLinkUrl,
    episodeMediaUrl: data.episodeMediaUrl,
    episodePubDate: data.episodePubDate,
    episodeTitle: data.episodeTitle,
    episodeTranscript: parseProp(data, 'episodeTranscript', []),
    episodeValue: parseProp(data, 'episodeValue', []),
    podcastFunding: parseProp(data, 'podcastFunding', []),
    podcastHideDynamicAdsWarning: data.podcastHideDynamicAdsWarning,
    podcastId: data.podcastId,
    podcastImageUrl: data.podcastImageUrl,
    podcastIndexPodcastId: data.podcastIndexPodcastId,
    podcastIsExplicit: data.podcastIsExplicit,
    podcastLinkUrl: data.podcastLinkUrl,
    podcastShrunkImageUrl: data.podcastShrunkImageUrl,
    podcastSortableTitle: data.podcastSortableTitle,
    podcastTitle: data.podcastTitle,
    podcastValue: parseProp(data, 'podcastValue', []),
    userPlaybackPosition: userPlaybackPosition || 0
  }
}

export const convertToNowPlayingItem = (
  data: any,
  inheritedEpisode = {} as any,
  inheritedPodcast = {} as any,
  userPlaybackPosition = 0
) => {
  const nowPlayingItem: NowPlayingItem = {}

  if (!data) {
    return {}
  }

  const e = (data.pubDate && data) || data.episode || inheritedEpisode
  const p =
    (data.episode && data.episode.podcast) || data.podcast || inheritedPodcast

  // If it has a podcast_id field, assume it is an Episode list item
  if (data.podcast_id) {
    nowPlayingItem.episodeChaptersUrl = data.chaptersUrl
    nowPlayingItem.episodeDescription = data.description
    nowPlayingItem.episodeDuration = data.duration
    nowPlayingItem.episodeFunding = parseProp(data, 'funding', [])
    nowPlayingItem.episodeId = data.id
    nowPlayingItem.episodeLinkUrl = data.linkUrl
    nowPlayingItem.episodeMediaUrl = data.mediaUrl
    nowPlayingItem.episodePubDate = data.pubDate
    nowPlayingItem.episodeTitle = data.title
    nowPlayingItem.episodeTranscript = parseProp(data, 'transcript', []),
    nowPlayingItem.episodeValue = parseProp(data, 'value', [])
    nowPlayingItem.podcastFunding = parseProp(data, 'podcast_funding', [])
    nowPlayingItem.podcastHideDynamicAdsWarning = data.podcast_hideDynamicAdsWarning
    nowPlayingItem.podcastId = data.podcast_id
    nowPlayingItem.podcastImageUrl = data.podcast_shrunkImageUrl || data.podcast_imageUrl
    nowPlayingItem.podcastIndexPodcastId = data.podcast_podcastIndexId
    nowPlayingItem.podcastLinkUrl = data.podcast_linkUrl
    nowPlayingItem.podcastShrunkImageUrl = data.podcast_shrunkImageUrl
    nowPlayingItem.podcastSortableTitle = data.podcast_sortableTitle
    nowPlayingItem.podcastTitle = data.podcast_title
    nowPlayingItem.podcastValue = parseProp(data, 'podcast_value', [])
    nowPlayingItem.userPlaybackPosition = userPlaybackPosition || 0
    // If it has a pubDate field, assume it is an Episode
  } else if (data.pubDate) {
    nowPlayingItem.episodeChaptersUrl = data.chaptersUrl
    nowPlayingItem.episodeDescription = data.description
    nowPlayingItem.episodeDuration = data.duration
    nowPlayingItem.episodeFunding = parseProp(data, 'funding', [])
    nowPlayingItem.episodeId = data.id
    nowPlayingItem.episodeLinkUrl = data.linkUrl
    nowPlayingItem.episodeMediaUrl = data.mediaUrl
    nowPlayingItem.episodePubDate = data.pubDate
    nowPlayingItem.episodeTitle = data.title
    nowPlayingItem.episodeTranscript = parseProp(data, 'transcript', [])
    nowPlayingItem.episodeValue = parseProp(data, 'value', [])
    nowPlayingItem.podcastFunding = parseProp(p, 'funding', [])
    nowPlayingItem.podcastHideDynamicAdsWarning = p.hideDynamicAdsWarning
    nowPlayingItem.podcastId = p.id
    nowPlayingItem.podcastImageUrl = p.shrunkImageUrl || p.imageUrl
    nowPlayingItem.podcastIndexPodcastId = p.podcastIndexId
    nowPlayingItem.podcastIsExplicit = p.isExplicit
    nowPlayingItem.podcastLinkUrl = p.linkUrl
    nowPlayingItem.podcastShrunkImageUrl = p.shrunkImageUrl
    nowPlayingItem.podcastSortableTitle = p.sortableTitle
    nowPlayingItem.podcastTitle = p.title
    nowPlayingItem.podcastValue = parseProp(p, 'value', [])
    nowPlayingItem.userPlaybackPosition = userPlaybackPosition || 0
    // Else assume it is a MediaRef
  } else {
    nowPlayingItem.clipEndTime = data.endTime
    nowPlayingItem.clipId = data.id
    nowPlayingItem.clipIsOfficialChapter = data.isOfficialChapter
    nowPlayingItem.clipIsOfficialSoundBite = data.isOfficialSoundBite
    nowPlayingItem.clipStartTime = data.startTime
    nowPlayingItem.clipTitle = data.title
    nowPlayingItem.episodeChaptersUrl = e.chaptersUrl
    nowPlayingItem.episodeDescription = e.description
    nowPlayingItem.episodeDuration = e.duration
    nowPlayingItem.episodeFunding = parseProp(e, 'funding', [])
    nowPlayingItem.episodeId = e.id
    nowPlayingItem.episodeImageUrl = e.imageUrl
    nowPlayingItem.episodeLinkUrl = e.linkUrl
    nowPlayingItem.episodeMediaUrl = e.mediaUrl
    nowPlayingItem.episodePubDate = e.pubDate
    nowPlayingItem.episodeTitle = e.title
    nowPlayingItem.episodeTranscript = parseProp(e, 'transcript', [])
    nowPlayingItem.episodeValue = parseProp(e, 'value', [])
    nowPlayingItem.isPublic = data.isPublic
    nowPlayingItem.ownerId = data.owner && data.owner.id
    nowPlayingItem.ownerIsPublic = data.owner && data.owner.isPublic
    nowPlayingItem.ownerName = data.owner && data.owner.name
    nowPlayingItem.podcastFunding = parseProp(p, 'funding', [])
    nowPlayingItem.podcastHideDynamicAdsWarning = p.hideDynamicAdsWarning
    nowPlayingItem.podcastId = p.id
    nowPlayingItem.podcastIsExplicit = p.isExplicit
    nowPlayingItem.podcastImageUrl = p.shrunkImageUrl || p.imageUrl
    nowPlayingItem.podcastIndexPodcastId = p.podcastIndexId
    nowPlayingItem.podcastLinkUrl = p.linkUrl
    nowPlayingItem.podcastShrunkImageUrl = p.shrunkImageUrl
    nowPlayingItem.podcastSortableTitle = p.sortableTitle
    nowPlayingItem.podcastTitle = p.title
    nowPlayingItem.podcastValue = parseProp(p, 'value', [])
    nowPlayingItem.userPlaybackPosition =
      userPlaybackPosition || data.clipStartTime || 0
  }

  nowPlayingItem.addByRSSPodcastFeedUrl = data.addByRSSPodcastFeedUrl || (inheritedPodcast && inheritedPodcast.addByRSSPodcastFeedUrl)

  return nowPlayingItem
}
