import { SatoshiStreamStats } from './satoshiStream'

export type ValueTag = {
  method: string
  suggested: string
  type: string
  valueRecipients: ValueRecipient[]
}

export type ValueRecipient = {
  address: string
  customKey?: string
  customValue?: unknown
  fee?: boolean | null
  name?: string
  split: number
  type: string
}

export type ValueRecipientNormalized = {
  address: string
  amount: number
  customKey?: string
  customValue?: unknown
  fee?: boolean | null
  name?: string
  normalizedSplit: number
  split: number
  type: string
}

export type ValueTransaction = {
  createdAt: Date
  normalizedValueRecipient: ValueRecipientNormalized
  satoshiStreamStats: SatoshiStreamStats
}
