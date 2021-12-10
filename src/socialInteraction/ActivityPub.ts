export type ActivityPubAttachment = {
  mediaType: string
  url: string
}

export type ActivityPubNote = {
  attachment: ActivityPubAttachment[] | null
  attributedTo: string | null
  content: string | null
  id: string
  inReplyToAtomUri: string | null
  published: Date | null
  replies: {
    first: {
      next: string | null
    }
  }
  url: string | null
}

export type ActivityPubCollectionPage = {
  items: ActivityPubNote[]
}
