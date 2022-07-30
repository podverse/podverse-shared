export type FeedUrl = {
  id: string
  url: string
}

export const getAuthorityFeedUrlFromArray = (feedUrlObjects: any[]) => {
  const obj = feedUrlObjects.find((feedUrlObject) => feedUrlObject.isAuthority)
  return obj?.url || null
}
