import { Episode } from ".";

export type LiveItem = {
  status: 'pending' | 'live' | 'ended'
  start: Date
  end: Date | null
  episode: Episode
}
