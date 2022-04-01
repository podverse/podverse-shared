import { Episode } from ".."

export declare type SocialInteraction = {
  id?: string
  platform?: string
  protocol?: string
  uri?: string
  url?: string
}

export const checkIfHasSupportedCommentTag = (episode: Episode) => {
  return !!(episode.socialInteraction &&
    episode.socialInteraction.some(
      (si: SocialInteraction) =>
        si.platform === 'activitypub' ||
        si.protocol === 'activitypub' ||
        si.platform === 'mastodon' ||
        si.platform === 'twitter' ||
        si.protocol === 'twitter'
    ))
}

export const SocialInteractionKeys = {
  platform: {
    activitypub: 'activitypub',
    castopod: 'castopod',
    mastodon: 'mastodon',
    peertube: 'peertube',
    twitter: 'twitter'
  },
  protocol: {
    activitypub: 'activitypub',
    twitter: 'twitter'
  }
}
