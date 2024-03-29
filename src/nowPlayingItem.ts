import { Author, EpisodeAlternateEnclosure, PodcastMedium, SocialInteraction } from '.'
import { LiveItem } from './LiveItem'
import { Transcript } from './transcript'

export type NowPlayingItem = {
  addByRSSPodcastFeedUrl?: string
  clipEndTime?: number
  clipId?: string
  clipIsChapterToc?: boolean | null
  clipIsOfficialChapter?: boolean
  clipIsOfficialSoundBite?: boolean
  clipLinkUrl?: string
  clipStartTime?: number
  clipTitle?: string
  episodeAlternateEnclosures?: EpisodeAlternateEnclosure[]
  episodeAlternateEnclosureSelected?: EpisodeAlternateEnclosure | null
  episodeAuthors?: Author[]
  episodeChaptersUrl?: string
  episodeCredentialsRequired?: boolean
  episodeDescription?: string
  episodeDuration?: number
  episodeFunding?: any
  episodeGuid?: string
  episodeId?: string
  episodeImageUrl?: string
  episodeLinkUrl?: string
  episodeMediaType?: string
  episodeMediaUrl?: string
  episodePubDate?: string
  episodeSocialInteraction?: SocialInteraction
  episodeSubtitle?: string
  episodeTitle?: string
  episodeTranscript?: Transcript[]
  episodeValue?: any
  isPublic?: boolean
  liveItem?: LiveItem
  ownerId?: string
  ownerIsPublic?: boolean
  ownerName?: string
  podcastAuthors?: Author[]
  podcastCredentialsRequired?: boolean
  podcastFunding?: any
  podcastHasVideo?: boolean
  podcastHideDynamicAdsWarning?: boolean
  podcastGuid?: string
  podcastHasSeasons?: boolean
  podcastId?: string
  podcastImageUrl?: string
  podcastIndexPodcastId?: string
  podcastIsExplicit?: boolean
  podcastItunesFeedType?: string
  podcastMedium?: PodcastMedium
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
      clipLinkUrl: item.clipLinkUrl || '',
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
    episodeAlternateEnclosures: parseProp(item, 'episodeAlternateEnclosures', []),
    episodeAlternateEnclosureSelected: parseProp(item, 'episodeAlternateEnclosureSelected', null),
    episodeAuthors: item.episodeAuthors || [],
    episodeChaptersUrl: item.episodeChaptersUrl || '',
    episodeCredentialsRequired: item.episodeCredentialsRequired || false,
    episodeDescription: item.episodeDescription || '',
    episodeDuration: item.episodeDuration || null,
    episodeFunding: parseProp(item, 'episodeFunding', []),
    episodeGuid: item.episodeGuid || '',
    episodeId: item.episodeId || '',
    episodeImageUrl: item.episodeImageUrl || '',
    episodeLinkUrl: item.episodeLinkUrl || '',
    episodeMediaType: item.episodeMediaType || '',
    episodeMediaUrl: item.episodeMediaUrl || '',
    ...(item.episodePubDate ? { episodePubDate: item.episodePubDate } : {}),
    episodeSocialInteraction: parseProp(item, 'episodeSocialInteraction', []),
    episodeSubtitle: item.episodeSubtitle || '',
    episodeTitle: item.episodeTitle || '',
    episodeTranscript: parseProp(item, 'episodeTranscript', []),
    episodeValue: parseProp(item, 'episodeValue', []),
    isPublic: item.isPublic || false,
    liveItem: item.liveItem || null,
    podcastAuthors: item.podcastAuthors || [],
    podcastCredentialsRequired: item.podcastCredentialsRequired || false,
    podcastFunding: parseProp(item, 'podcastFunding', []),
    podcastGuid: item.podcastGuid || '',
    podcastHasSeasons: item.podcastHasSeasons || false,
    podcastHasVideo: item.podcastHasVideo || false,
    podcastHideDynamicAdsWarning: item.podcastHideDynamicAdsWarning || false,
    podcastId: item.podcastId || '',
    podcastImageUrl: item.podcastImageUrl || '',
    podcastIndexPodcastId: item.podcastIndexPodcastId || '',
    podcastIsExplicit: item.podcastIsExplicit || false,
    podcastItunesFeedType: item.podcastItunesFeedType || '',
    podcastLinkUrl: item.podcastLinkUrl || '',
    podcastMedium: item.podcastMedium || 'podcast',
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
  if (typeof item === 'object' && typeof item[key] === 'string') {
    try {
      val = JSON.parse(item[key])
    } catch (error) {
      console.log(`parseProp ${key} error`, error)
    }
  } else if (item[key]) {
    val = item[key]
  }
  return val
}

export const convertNowPlayingItemToEpisode = (item: NowPlayingItem) => {
  return {
    alternateEnclosures: parseProp(item, 'episodeAlternateEnclosures', []),
    authors: item.episodeAuthors,
    chaptersUrl: item.episodeChaptersUrl,
    credentialsRequired: item.episodeCredentialsRequired || false,
    description: item.episodeDescription,
    duration: item.episodeDuration,
    funding: parseProp(item, 'episodeFunding', []),
    guid: item.episodeGuid,
    id: item.episodeId,
    imageUrl: item.episodeImageUrl,
    linkUrl: item.episodeLinkUrl,
    liveItem: item.liveItem,
    mediaType: item.episodeMediaType,
    mediaUrl: item.episodeMediaUrl,
    pubDate: item.episodePubDate,
    socialInteraction: item.episodeSocialInteraction,
    subtitle: item.episodeSubtitle,
    title: item.episodeTitle,
    transcript: parseProp(item, 'episodeTranscript', []),
    value: parseProp(item, 'episodeValue', []),
    podcast: {
      addByRSSPodcastFeedUrl: item.addByRSSPodcastFeedUrl,
      authors: item.podcastAuthors,
      credentialsRequired: item.podcastCredentialsRequired,
      funding: parseProp(item, 'podcastFunding', []),
      hasSeasons: item.podcastHasSeasons,
      hasVideo: item.podcastHasVideo,
      hideDynamicAdsWarning: item.podcastHideDynamicAdsWarning,
      id: item.podcastId,
      imageUrl: item.podcastImageUrl,
      isExplicit: item.podcastIsExplicit,
      itunesFeedType: item.podcastItunesFeedType,
      linkUrl: item.podcastLinkUrl,
      medium: item.podcastMedium,
      podcastGuid: item.podcastGuid,
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
    isChapterToc: item.clipIsChapterToc,
    isOfficialChapter: item.clipIsOfficialChapter,
    isOfficialSoundBite: item.clipIsOfficialSoundBite,
    isPublic: item.isPublic,
    linkUrl: item.clipLinkUrl || '',
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
    episodeAlternateEnclosures: parseProp(data, 'episodeAlternateEnclosures', []),
    episodeAlternateEnclosureSelected: parseProp(data, 'episodeAlternateEnclosureSelected', null),
    episodeAuthors: data.episodeAuthors || [],
    episodeChaptersUrl: data.episodeChaptersUrl,
    episodeCredentialsRequired: data.episodeCredentialsRequired,
    episodeDescription: data.episodeDescription,
    episodeDuration: data.episodeDuration,
    episodeFunding: parseProp(data, 'episodeFunding', []),
    episodeGuid: data.episodeGuid,
    episodeId: data.episodeId,
    episodeImageUrl: data.episodeImageUrl,
    episodeLinkUrl: data.episodeLinkUrl,
    episodeMediaType: data.episodeMediaType,
    episodeMediaUrl: data.episodeMediaUrl,
    episodePubDate: data.episodePubDate,
    episodeSocialInteraction: parseProp(data, 'episodeSocialInteraction', []),
    episodeSubtitle: data.episodeSubtitle,
    episodeTitle: data.episodeTitle,
    episodeTranscript: parseProp(data, 'episodeTranscript', []),
    episodeValue: parseProp(data, 'episodeValue', []),
    liveItem: null,
    podcastAuthors: data.podcastAuthors || [],
    podcastCredentialsRequired: data.podcastCredentialsRequired,
    podcastFunding: parseProp(data, 'podcastFunding', []),
    podcastGuid: data.podcastGuid,
    podcastHasSeasons: data.podcastHasSeasons,
    podcastHasVideo: data.podcastHasVideo,
    podcastHideDynamicAdsWarning: data.podcastHideDynamicAdsWarning,
    podcastId: data.podcastId,
    podcastImageUrl: data.podcastImageUrl,
    podcastIndexPodcastId: data.podcastIndexPodcastId,
    podcastIsExplicit: data.podcastIsExplicit,
    podcastItunesFeedType: data.podcastItunesFeedType,
    podcastLinkUrl: data.podcastLinkUrl,
    podcastMedium: data.podcastMedium,
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
    nowPlayingItem.episodeAlternateEnclosures = parseProp(data, 'alternateEnclosures', []),
    nowPlayingItem.episodeAlternateEnclosureSelected = null,
    nowPlayingItem.episodeAuthors = data.authors || []
    nowPlayingItem.episodeChaptersUrl = data.chaptersUrl
    nowPlayingItem.episodeCredentialsRequired = data.credentialsRequired
    nowPlayingItem.episodeDescription = data.description
    nowPlayingItem.episodeDuration = data.duration
    nowPlayingItem.episodeFunding = parseProp(data, 'funding', [])
    nowPlayingItem.episodeGuid = data.guid
    nowPlayingItem.episodeId = data.id
    nowPlayingItem.episodeImageUrl = data.imageUrl
    nowPlayingItem.episodeLinkUrl = data.linkUrl
    nowPlayingItem.episodeMediaType = data.mediaType
    nowPlayingItem.episodeMediaUrl = data.mediaUrl
    nowPlayingItem.episodePubDate = data.pubDate
    nowPlayingItem.episodeSocialInteraction = data.socialInteraction
    nowPlayingItem.episodeSubtitle = data.subtitle
    nowPlayingItem.episodeTitle = data.title
    nowPlayingItem.episodeTranscript = parseProp(data, 'transcript', []),
    nowPlayingItem.episodeValue = parseProp(data, 'value', [])
    nowPlayingItem.liveItem = data.liveItem
    nowPlayingItem.podcastAuthors = data.podcast_authors || []
    nowPlayingItem.podcastCredentialsRequired = data.podcast_credentialsRequired
    nowPlayingItem.podcastFunding = parseProp(data, 'podcast_funding', [])
    nowPlayingItem.podcastGuid = data.podcast_podcastGuid
    nowPlayingItem.podcastHasVideo = data.podcast_hasVideo
    nowPlayingItem.podcastHideDynamicAdsWarning = data.podcast_hideDynamicAdsWarning
    nowPlayingItem.podcastId = data.podcast_id
    nowPlayingItem.podcastImageUrl = data.podcast_shrunkImageUrl || data.podcast_imageUrl
    nowPlayingItem.podcastIndexPodcastId = data.podcast_podcastIndexId
    nowPlayingItem.podcastLinkUrl = data.podcast_linkUrl
    nowPlayingItem.podcastMedium = data.podcast_medium
    nowPlayingItem.podcastShrunkImageUrl = data.podcast_shrunkImageUrl
    nowPlayingItem.podcastSortableTitle = data.podcast_sortableTitle
    nowPlayingItem.podcastTitle = data.podcast_title
    nowPlayingItem.podcastValue = parseProp(data, 'podcast_value', [])
    nowPlayingItem.userPlaybackPosition = userPlaybackPosition || 0
    // If it has a pubDate field, assume it is an Episode
  } else if (data.pubDate) {
    nowPlayingItem.episodeAlternateEnclosures = parseProp(data, 'alternateEnclosures', [])
    nowPlayingItem.episodeAlternateEnclosureSelected = null
    nowPlayingItem.episodeAuthors = data.authors || []
    nowPlayingItem.episodeChaptersUrl = data.chaptersUrl
    nowPlayingItem.episodeCredentialsRequired = data.credentialsRequired
    nowPlayingItem.episodeDescription = data.description
    nowPlayingItem.episodeDuration = data.duration
    nowPlayingItem.episodeFunding = parseProp(data, 'funding', [])
    nowPlayingItem.episodeGuid = data.guid
    nowPlayingItem.episodeId = data.id
    nowPlayingItem.episodeImageUrl = data.imageUrl
    nowPlayingItem.episodeLinkUrl = data.linkUrl
    nowPlayingItem.episodeMediaType = data.mediaType
    nowPlayingItem.episodeMediaUrl = data.mediaUrl
    nowPlayingItem.episodePubDate = data.pubDate
    nowPlayingItem.episodeSocialInteraction = parseProp(data, 'socialInteraction', [])
    nowPlayingItem.episodeSubtitle = data.subtitle
    nowPlayingItem.episodeTitle = data.title
    nowPlayingItem.episodeTranscript = parseProp(data, 'transcript', [])
    nowPlayingItem.episodeValue = parseProp(data, 'value', [])
    nowPlayingItem.liveItem = data.liveItem
    nowPlayingItem.podcastAuthors = p.authors || []
    nowPlayingItem.podcastCredentialsRequired = p.credentialsRequired
    nowPlayingItem.podcastFunding = parseProp(p, 'funding', [])
    nowPlayingItem.podcastGuid = p.podcastGuid
    nowPlayingItem.podcastHasSeasons = p.hasSeasons
    nowPlayingItem.podcastHasVideo = p.hasVideo
    nowPlayingItem.podcastHideDynamicAdsWarning = p.hideDynamicAdsWarning
    nowPlayingItem.podcastId = p.id
    nowPlayingItem.podcastImageUrl = p.shrunkImageUrl || p.imageUrl
    nowPlayingItem.podcastIndexPodcastId = p.podcastIndexId
    nowPlayingItem.podcastIsExplicit = p.isExplicit
    nowPlayingItem.podcastItunesFeedType = p.itunesFeedType
    nowPlayingItem.podcastLinkUrl = p.linkUrl
    nowPlayingItem.podcastMedium = p.medium
    nowPlayingItem.podcastShrunkImageUrl = p.shrunkImageUrl
    nowPlayingItem.podcastSortableTitle = p.sortableTitle
    nowPlayingItem.podcastTitle = p.title
    nowPlayingItem.podcastValue = parseProp(p, 'value', [])
    nowPlayingItem.userPlaybackPosition = userPlaybackPosition || 0
    // Else assume it is a MediaRef
  } else {
    nowPlayingItem.clipEndTime = data.endTime
    nowPlayingItem.clipId = data.id
    nowPlayingItem.clipIsChapterToc = data.isChapterToc
    nowPlayingItem.clipIsOfficialChapter = data.isOfficialChapter
    nowPlayingItem.clipIsOfficialSoundBite = data.isOfficialSoundBite
    nowPlayingItem.clipLinkUrl = data.linkUrl || ''
    nowPlayingItem.clipStartTime = data.startTime
    nowPlayingItem.clipTitle = data.title
    nowPlayingItem.episodeAlternateEnclosures = parseProp(e, 'alternateEnclosures', [])
    nowPlayingItem.episodeAlternateEnclosureSelected = null
    nowPlayingItem.episodeAuthors = e.authors
    nowPlayingItem.episodeChaptersUrl = e.chaptersUrl
    nowPlayingItem.episodeCredentialsRequired = e.credentialsRequired
    nowPlayingItem.episodeDescription = e.description
    nowPlayingItem.episodeDuration = e.duration
    nowPlayingItem.episodeFunding = parseProp(e, 'funding', [])
    nowPlayingItem.episodeGuid = e.guid
    nowPlayingItem.episodeId = e.id
    nowPlayingItem.episodeImageUrl = e.imageUrl
    nowPlayingItem.episodeLinkUrl = e.linkUrl
    nowPlayingItem.episodeMediaType = e.mediaType
    nowPlayingItem.episodeMediaUrl = e.mediaUrl
    nowPlayingItem.episodePubDate = e.pubDate
    nowPlayingItem.episodeSocialInteraction = parseProp(e, 'socialInteraction', [])
    nowPlayingItem.episodeSubtitle = e.subtitle
    nowPlayingItem.episodeTitle = e.title
    nowPlayingItem.episodeTranscript = parseProp(e, 'transcript', [])
    nowPlayingItem.episodeValue = parseProp(e, 'value', [])
    nowPlayingItem.isPublic = data.isPublic
    nowPlayingItem.liveItem = data.liveItem
    nowPlayingItem.ownerId = data.owner && data.owner.id
    nowPlayingItem.ownerIsPublic = data.owner && data.owner.isPublic
    nowPlayingItem.ownerName = data.owner && data.owner.name
    nowPlayingItem.podcastAuthors = p.authors
    nowPlayingItem.podcastCredentialsRequired = p.credentialsRequired
    nowPlayingItem.podcastFunding = parseProp(p, 'funding', [])
    nowPlayingItem.podcastGuid = p.podcastGuid
    nowPlayingItem.podcastHasVideo = p.hasVideo
    nowPlayingItem.podcastHideDynamicAdsWarning = p.hideDynamicAdsWarning
    nowPlayingItem.podcastId = p.id
    nowPlayingItem.podcastIsExplicit = p.isExplicit
    nowPlayingItem.podcastImageUrl = p.shrunkImageUrl || p.imageUrl
    nowPlayingItem.podcastIndexPodcastId = p.podcastIndexId
    nowPlayingItem.podcastLinkUrl = p.linkUrl
    nowPlayingItem.podcastMedium = p.medium
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

export const checkIfNowPlayingItem = (item?: any, nowPlayingItem?: any) => {
  return item && nowPlayingItem && (nowPlayingItem.clipId === item.id || nowPlayingItem.episodeId === item.id)
}

export const checkIfSameNowPlayingItems = (nowPlayingItem?: any, nowPlayingItem2?: any) => {
  return nowPlayingItem
    && nowPlayingItem2
    && (
      (nowPlayingItem.clipId && nowPlayingItem.clipId === nowPlayingItem2.clipId)
      || (nowPlayingItem.episodeId && nowPlayingItem.episodeId === nowPlayingItem2.episodeId)
    )
}

export const checkIfVideoFileType = (nowPlayingItem?: NowPlayingItem) => {
  return !!(nowPlayingItem?.episodeMediaType && nowPlayingItem.episodeMediaType.indexOf('video') >= 0)
}

export const checkIfVideoFileOrVideoLiveType = (mediaType?: string) => {
  return !!(
    typeof mediaType === 'string'
    && 
      (mediaType.indexOf('video') >= 0
      || mediaType.indexOf('application/x-mpegURL') >= 0))
}

export const haveNowPlayingItemsChanged = (lastItem: NowPlayingItem, nextItem: NowPlayingItem) =>
  (nextItem.clipId && nextItem.clipId !== lastItem.clipId) ||
  (nextItem.episodeId && nextItem.episodeId !== lastItem.episodeId)
