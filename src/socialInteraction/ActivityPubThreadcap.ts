export type ActivityPubThreadcapResponse = {
  root: string
  nodes: {
    [key: string]: ActivityPubThreadcapNode
  }
  commenters: {
    [key: string]: ActivityPubThreadcapCommenter
  }
}

export type ActivityPubThreadcapNode = {
  comment: ActivityPubThreadcapNodeComment
  commentAsof: Date
  replies: string[]
  repliesAsof: Date
}

export type ActivityPubThreadcapNodeComment = {
  attachments: ActivityPubThreadcapAttachment[] | null
  attributedTo: string | null
  content: any // not sure how to handle this
  published: Date | null
  url: string | null
}

export type ActivityPubThreadcapAttachment = {
  height?: number
  mediaType: string
  url: string
  width?: number
}

export type ActivityPubThreadcapCommenter = {
  asof: Date
  fqUsername: string
  icon: ActivityPubThreadcapCommenterIcon
  name?: string
  url: string
}

export type ActivityPubThreadcapCommenterIcon = {
  mediaType: string
  url: string
}
