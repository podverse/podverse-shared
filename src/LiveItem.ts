import { Episode } from ".";

export type LiveItemStatus = 'pending' | 'live' | 'ended' | 'none'

export type LiveItem = {
  status: LiveItemStatus
  start: Date
  end: Date | null
  episode: Episode
}
