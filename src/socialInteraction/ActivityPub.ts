const allowedImageOrigins = [
  'https://comments.podfriend.com',
  'https://engineered.space',
  'https://fosstodon.org',
  'https://itmslaves.com',
  'https://mastodon.cloud',
  'https://mastodon.social',
  'https://noagendasocial.com',
  'https://podcastindex.social',
  'https://sasuke.social',
  'https://social.medusmedia.com'
]

export const checkIfAllowedImageOrigin = (commenter: any) => {
  return allowedImageOrigins.some((origin: string) => {
    return commenter.url && commenter.url.indexOf(origin) >= 0
  })
}
