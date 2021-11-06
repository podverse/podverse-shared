import { Episode, MediaRef, User } from ".";

export type UserNowPlayingItem = {
  id: string
  userPlaybackPosition: number
  episode: Episode
  mediaRef: MediaRef
  owner: User
}
