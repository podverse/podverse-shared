export type ActivityPubThreadcapAttachment = {
  height?: number
  mediaType: string
  url: string
  width?: number
}

export type ActivityPubThreadcapResponse = {
  comment: {
    attachments: ActivityPubThreadcapAttachment[] | null
    attributedTo: string | null
    content: any // not sure how to handle this
    published: Date | null
    url: string | null
  }
  commentAsof: Date
  replies: string[]
  repliesAsof: Date
}
