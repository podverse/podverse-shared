import { Episode, MediaRef, User } from "."

export type UserHistoryItem = {
  id: string
  completed: boolean
  mediaFileDuration: number
  orderChangedDate: Date
  userPlaybackPosition: number
  episode: Episode
  mediaRef: MediaRef
  owner: User
}
