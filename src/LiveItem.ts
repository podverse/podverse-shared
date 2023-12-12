import { Episode } from "."

export type LiveItemStatus = 'pending' | 'live' | 'ended' | 'none'

export const liveItemStatuses = ['live', 'pending', 'ended']

export type LiveItem = {
  // ids
  id: string

  // other props
  chatIRCURL?: string | null
  end: Date | null
  start: Date
  status: LiveItemStatus
  
  // relationships
  episode: Episode

  // column dates
  createdAt: Date
  updatedAt: Date
}
