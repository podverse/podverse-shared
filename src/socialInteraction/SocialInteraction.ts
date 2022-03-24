import { Episode } from ".."

export declare type SocialInteraction = {
  id?: string
  platform?: string
  protocol?: string
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
