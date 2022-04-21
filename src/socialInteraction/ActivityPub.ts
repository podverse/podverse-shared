const allowedImageOrigins = [
  'https://bitcoinhackers.org',
  'https://cawfee.club',
  'https://comments.podfriend.com',
  'https://engineered.space',
  'https://fosstodon.org',
  'https://freeatlantis.com',
  'https://friendica.eskimo.com',
  'https://itmslaves.com',
  'https://liberdon.com',
  'https://mastodon.cloud',
  'https://mastodon.online',
  'https://mastodon.social',
  'https://noagendasocial.com',
  'https://podcastindex.social',
  'https://quanta.wiki',
  'https://sasuke.social',
  'https://social.librem.one',
  'https://social.medusmedia.com',
  'https://twit.social',
  'https://www.sliekcastopod.com'
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
