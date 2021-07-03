import { SatoshiStreamStats } from './satoshiStream'

export type ValueTag = {
  method: string
  suggested: string
  type: string
  recipients: ValueRecipient[]
}

export type ValueRecipient = {
  address: string
  customKey?: string
  customValue?: any
  fee?: boolean | null
  name?: string
  split: number | string
  type: string
}

export type ValueRecipientNormalized = {
  address: string
  amount: number
  customKey?: string
  customValue?: any
  fee?: boolean | null
  name?: string
  normalizedSplit: number
  split: number | string
  type: string
}

export type ValueTransaction = {
  createdAt: number
  method: string
  normalizedValueRecipient: ValueRecipientNormalized
  satoshiStreamStats: SatoshiStreamStats
  type: string
}
