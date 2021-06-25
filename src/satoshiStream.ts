// For mappings of key integer definitions, visit
// https://github.com/satoshisstream/satoshis.stream/blob/main/TLV_registry.md#field-7629169
export type SatoshiStreamStats = {
  7629169: SatoshiStreamStatsPodcast // the "podcast" subject according to SatoshiStream spec
  7629175: SatoshiStreamStatsPodcastIndexId // the feedId of the podcast in Podcast Index
}

export type SatoshiStreamStatsPodcast = {
  podcast: string // title of the podcast
  episode: string // title of the episode
  ts: number // timestamp of when the transaction was created
  action: string // boost or stream
  speed: string // speed of player
  pubkey: string // sending node pubkey
  uuid: string // random unique UID we generate
  value_msat: number // transaction amount in millisats
}

export type SatoshiStreamStatsPodcastIndexId = number | null
