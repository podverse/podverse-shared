import { Phase6ValueTimeSplit } from 'podcast-partytime/dist/parser/phase/phase-6'
import { SatoshiStreamStats } from './satoshiStream'

export type ValueTimeSplit = {
  type: 'remoteItem' | 'remoteItemToAppConverted' | 'localSpecified' | 'localSpecifiedToAppConverted'
  startTime: number
  duration: number
  endTime: number
  remoteStartTime?: number
  remotePercentage?: number
  remoteItem?: {
    feedGuid?: string
    itemGuid: string
    medium?: string
  }
  valueTags: ValueTagExtended[]
}

export type ValueTagOriginal = {
  method: string
  suggested?: string
  type: string
  recipients: ValueRecipient[]
  valueTimeSplits?: Phase6ValueTimeSplit[]
}

export type ValueTagExtended = {
  method: string
  suggested?: string
  type: string
  recipients: ValueRecipient[]
  valueTimeSplits?: Phase6ValueTimeSplit[] | null
  activeValueTimeSplit?: {
    isActive: boolean
    startTime: number
    endTime: number
  }
  remotePercentage?: number
  remoteFeedGuid?: string
  remoteItemGuid?: string
  parentValueTag?: ValueTagExtended
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

export const getLightningKeysendValueItem = (valueTags?: ValueTagExtended[]) => {
  return valueTags?.find((valueTag) => checkIfIsLightningKeysendValueTag(valueTag))
}

export const addLightningBoltToString = (str = '') => {
  return `${str} ⚡️`
}

export const checkIfIsLightningKeysendValueTag = (valueTag?: ValueTagExtended) => {
  return valueTag && valueTag.method === 'keysend' && valueTag.type === 'lightning'
}
