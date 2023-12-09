import { Episode, MediaRef, PodcastMedium, User } from "."

export type Playlist = {
  id: string
  description?: string | null
  isDefault: boolean
  isPublic: boolean
  itemCount: number
  itemsOrder: string[]
  medium: PodcastMedium
  title?: string | null
  episodes: Episode[]
  mediaRefs: MediaRef[]
  owner: User
}

export const combineAndSortPlaylistItems = (episodes: [any], mediaRefs: [any], itemsOrder: [string]) => {
  const allPlaylistItems = [...episodes, ...mediaRefs]
  const remainingPlaylistItems = [] as any[]

  const unsortedItems = allPlaylistItems.filter((x: any) => {
    const isSortedItem = Array.isArray(itemsOrder) && itemsOrder.some((id) => x.id === id)
    if (!isSortedItem) {
      return x
    } else if (x) {
      remainingPlaylistItems.push(x)
    }
  })

  const sortedItems = itemsOrder.reduce((results: any[], id: string) => {
    const items = remainingPlaylistItems.filter((x: any) => x.id === id)
    if (items.length > 0) {
      results.push(items[0])
    }
    return results
  }, [])

  return [...sortedItems, ...unsortedItems]
}
