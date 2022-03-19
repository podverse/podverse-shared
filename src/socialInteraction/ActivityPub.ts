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
  const regex = /^\B\@([\w\-]+) /
  let newStr = str
  let replaced = true
  do {
    replaced = newStr.search(regex) >= 0
    if (replaced) {
      newStr = newStr.replace(regex, '')
    }
  } while (replaced)
  
  return newStr
}
