import { mostPopularMediaFileHosts } from './resources/mostPopularMediaFileHosts'

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
  episodeFunding?: string
  episodeId?: string
  episodeImageUrl?: string
  episodeLinkUrl?: string
  episodeMediaUrl?: string
  episodePubDate?: string
  episodeTitle?: string
  episodeValue?: any
  isPublic?: boolean
  ownerId?: string
  ownerIsPublic?: boolean
  ownerName?: string
  podcastFunding?: string
  podcastHideDynamicAdsWarning?: boolean
  podcastId?: string
  podcastImageUrl?: string
  podcastIsExplicit?: boolean
  podcastLinkUrl?: string
  podcastShrunkImageUrl?: string
  podcastSortableTitle?: string
  podcastTitle?: string
  podcastValue?: any
  userPlaybackPosition?: number
}

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
    episodeFunding: item.episodeFunding || [],
    episodeId: item.episodeId || '',
    episodeImageUrl: item.episodeImageUrl || '',
    episodeLinkUrl: item.episodeLinkUrl || '',
    episodeMediaUrl: item.episodeMediaUrl || '',
    ...(item.episodePubDate ? { episodePubDate: item.episodePubDate } : {}),
    episodeTitle: item.episodeTitle || '',
    episodeValue: item.episodeValue || null,
    isPublic: item.isPublic || false,
    podcastFunding: item.podcastFunding || [],
    podcastHideDynamicAdsWarning: item.podcastHideDynamicAdsWarning || false,
    podcastId: item.podcastId || '',
    podcastImageUrl: item.podcastImageUrl || '',
    podcastIsExplicit: item.podcastIsExplicit || false,
    podcastLinkUrl: item.podcastLinkUrl || '',
    podcastShrunkImageUrl: item.podcastShrunkImageUrl || '',
    podcastSortableTitle: item.podcastSortableTitle || '',
    podcastTitle: item.podcastTitle || '',
    podcastValue: item.podcastValue || null,
    userPlaybackPosition: !item.userPlaybackPosition && item.userPlaybackPosition !== 0
      ? 0
      : item.userPlaybackPosition
  }
}

export const convertNowPlayingItemToEpisode = (item: NowPlayingItem) => {
  return {
    chaptersUrl: item.episodeChaptersUrl,
    description: item.episodeDescription,
    duration: item.episodeDuration,
    funding: item.episodeFunding,
    id: item.episodeId,
    linkUrl: item.episodeLinkUrl,
    mediaUrl: item.episodeMediaUrl,
    pubDate: item.episodePubDate,
    title: item.episodeTitle,
    value: item.episodeValue,
    podcast: {
      addByRSSPodcastFeedUrl: item.addByRSSPodcastFeedUrl,
      funding: item.podcastFunding,
      hideDynamicAdsWarning: item.podcastHideDynamicAdsWarning,
      id: item.podcastId,
      imageUrl: item.podcastImageUrl,
      isExplicit: item.podcastIsExplicit,
      linkUrl: item.podcastLinkUrl,
      shrunkImageUrl: item.podcastShrunkImageUrl,
      sortableTitle: item.podcastSortableTitle,
      title: item.podcastTitle,
      value: item.podcastValue
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
    episodeFunding: data.episodeFunding,
    episodeId: data.episodeId,
    episodeLinkUrl: data.episodeLinkUrl,
    episodeMediaUrl: data.episodeMediaUrl,
    episodePubDate: data.episodePubDate,
    episodeTitle: data.episodeTitle,
    episodeValue: data.episodeValue,
    podcastFunding: data.podcastFunding,
    podcastHideDynamicAdsWarning: data.podcastHideDynamicAdsWarning,
    podcastId: data.podcastId,
    podcastImageUrl: data.podcastImageUrl,
    podcastIsExplicit: data.podcastIsExplicit,
    podcastLinkUrl: data.podcastLinkUrl,
    podcastShrunkImageUrl: data.podcastShrunkImageUrl,
    podcastSortableTitle: data.podcastSortableTitle,
    podcastTitle: data.podcastTitle,
    podcastValue: data.podcastValue,
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
    nowPlayingItem.episodeFunding = data.funding
    nowPlayingItem.episodeId = data.id
    nowPlayingItem.episodeLinkUrl = data.linkUrl
    nowPlayingItem.episodeMediaUrl = data.mediaUrl
    nowPlayingItem.episodePubDate = data.pubDate
    nowPlayingItem.episodeTitle = data.title
    nowPlayingItem.episodeValue = data.value
    nowPlayingItem.podcastFunding = data.podcast_funding
    nowPlayingItem.podcastHideDynamicAdsWarning = data.podcast_hideDynamicAdsWarning
    nowPlayingItem.podcastId = data.podcast_id
    nowPlayingItem.podcastImageUrl = data.podcast_shrunkImageUrl || data.podcast_imageUrl
    nowPlayingItem.podcastLinkUrl = data.podcast_linkUrl
    nowPlayingItem.podcastShrunkImageUrl = data.podcast_shrunkImageUrl
    nowPlayingItem.podcastSortableTitle = data.podcast_sortableTitle
    nowPlayingItem.podcastTitle = data.podcast_title
    nowPlayingItem.podcastValue = data.podcast_value
    nowPlayingItem.userPlaybackPosition = userPlaybackPosition || 0
    // If it has a pubDate field, assume it is an Episode
  } else if (data.pubDate) {
    nowPlayingItem.episodeChaptersUrl = data.chaptersUrl
    nowPlayingItem.episodeDescription = data.description
    nowPlayingItem.episodeDuration = data.duration
    nowPlayingItem.episodeFunding = data.funding
    nowPlayingItem.episodeId = data.id
    nowPlayingItem.episodeLinkUrl = data.linkUrl
    nowPlayingItem.episodeMediaUrl = data.mediaUrl
    nowPlayingItem.episodePubDate = data.pubDate
    nowPlayingItem.episodeTitle = data.title
    nowPlayingItem.episodeValue = data.value
    nowPlayingItem.podcastFunding = p.funding
    nowPlayingItem.podcastHideDynamicAdsWarning = p.hideDynamicAdsWarning
    nowPlayingItem.podcastId = p.id
    nowPlayingItem.podcastImageUrl = p.shrunkImageUrl || p.imageUrl
    nowPlayingItem.podcastIsExplicit = p.isExplicit
    nowPlayingItem.podcastLinkUrl = p.linkUrl
    nowPlayingItem.podcastShrunkImageUrl = p.shrunkImageUrl
    nowPlayingItem.podcastSortableTitle = p.sortableTitle
    nowPlayingItem.podcastTitle = p.title
    nowPlayingItem.podcastValue = p.value
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
    nowPlayingItem.episodeFunding = e.funding
    nowPlayingItem.episodeId = e.id
    nowPlayingItem.episodeImageUrl = e.imageUrl
    nowPlayingItem.episodeLinkUrl = e.linkUrl
    nowPlayingItem.episodeMediaUrl = e.mediaUrl
    nowPlayingItem.episodePubDate = e.pubDate
    nowPlayingItem.episodeTitle = e.title
    nowPlayingItem.episodeValue = e.value
    nowPlayingItem.isPublic = data.isPublic
    nowPlayingItem.ownerId = data.owner && data.owner.id
    nowPlayingItem.ownerIsPublic = data.owner && data.owner.isPublic
    nowPlayingItem.ownerName = data.owner && data.owner.name
    nowPlayingItem.podcastFunding = p.funding
    nowPlayingItem.podcastHideDynamicAdsWarning = p.hideDynamicAdsWarning
    nowPlayingItem.podcastId = p.id
    nowPlayingItem.podcastIsExplicit = p.isExplicit
    nowPlayingItem.podcastImageUrl = p.shrunkImageUrl || p.imageUrl
    nowPlayingItem.podcastLinkUrl = p.linkUrl
    nowPlayingItem.podcastShrunkImageUrl = p.shrunkImageUrl
    nowPlayingItem.podcastSortableTitle = p.sortableTitle
    nowPlayingItem.podcastTitle = p.title
    nowPlayingItem.podcastValue = p.value
    nowPlayingItem.userPlaybackPosition =
      userPlaybackPosition || data.clipStartTime || 0
  }

  if (nowPlayingItem.episodeFunding) {
    nowPlayingItem.episodeFunding = typeof nowPlayingItem.episodeFunding === 'string'
      ? JSON.parse(nowPlayingItem.episodeFunding) : nowPlayingItem.episodeFunding
  }
  if (nowPlayingItem.podcastFunding) {
    nowPlayingItem.podcastFunding = typeof nowPlayingItem.podcastFunding === 'string'
      ? JSON.parse(nowPlayingItem.podcastFunding) : nowPlayingItem.podcastFunding
  }

  nowPlayingItem.addByRSSPodcastFeedUrl = data.addByRSSPodcastFeedUrl || (inheritedPodcast && inheritedPodcast.addByRSSPodcastFeedUrl)

  return nowPlayingItem
}
