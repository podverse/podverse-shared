import { Episode, MediaRef, User } from ".";

export type Playlist = {
  id: string
  description?: string | null
  isPublic: boolean
  itemCount: number
  itemsOrder: string[]
  title?: string | null
  episodes: Episode[]
  mediaRefs: MediaRef[]
  owner: User
}
