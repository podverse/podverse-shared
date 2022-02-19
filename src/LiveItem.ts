import { Episode } from ".";

export type LiveItem = {
  status: 'pending' | 'live' | 'ended'
  start: Date
  end: Date
  episode: Episode
}
