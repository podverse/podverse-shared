export type SatoshiStreamStats = {
  podcast: SatoshiStreamStatsPodcast
}

export type SatoshiStreamStatsPodcast = {
  podcast: string // title of the podcast
  episode: string // title of the episode
  ts: number // timestamp of when the transaction was created
  action: string // boost or stream
  speed: string // speed of player
  pubkey: string // sending node pubkey
  uuid: string // random unique UID we generate
  amount: number // transaction amount
}
