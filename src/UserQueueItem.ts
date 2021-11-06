import { Episode, MediaRef, User } from ".";

export type UserQueueItem = {
  id: string
  queuePosition: number
  episode: Episode
  mediaRef: MediaRef
  owner: User
}
