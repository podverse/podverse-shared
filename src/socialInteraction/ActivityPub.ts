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

export const removeUsernamesFromBeginningOfString = (str: string) => {
  /*
    Remove the first consecutive @username matches that appear in the beginning of the string.
    This is to remove the unnecessary @usernames that appear in every ActivityPub reply message.
  */
  const regex = /^\s*(?:@[^@\s]+ *)+/
  return str.replace(regex, '')
}
