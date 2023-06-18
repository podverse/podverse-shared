import { SatoshiStreamStats } from './satoshiStream'
import { Phase6ValueTimeSplit } from 'podcast-partytime/dist/parser/phase/phase-6'

export type ValueTag = {
  method: string
  suggested: string
  type: string
  recipients: ValueRecipient[]
  valueTimeSplits?: Phase6ValueTimeSplit[] | null
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
  providerKey: string
}

export const getLightningKeysendValueItem = (valueTags?: ValueTag[]) => {
  return valueTags?.find((valueTag) => checkIfIsLightningKeysendValueTag(valueTag))
}

export const addLightningBoltToString = (str = '') => {
  return `${str} ⚡️`
}

export const checkIfIsLightningKeysendValueTag = (valueTag?: ValueTag) => {
  return valueTag && valueTag.method === 'keysend' && valueTag.type === 'lightning'
}
