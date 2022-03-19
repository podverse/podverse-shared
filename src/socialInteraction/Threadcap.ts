export type ThreadcapResponse = {
  protocol: string
  roots: string
  nodes: {
    [key: string]: ThreadcapNode
  }
  commenters: {
    [key: string]: ThreadcapCommenter
  }
}

export type ThreadcapNode = {
  comment: ThreadcapNodeComment
  commentAsof: Date
  commentError?: string
  replies: string[]
  repliesAsof: Date
  repliesError?: string
}

export type ThreadcapNodeComment = {
  attachments: ThreadcapAttachment[] | null
  attributedTo: string | null
  content: any // not sure how to handle this
  published: Date | null
  url: string | null
}

export type ThreadcapAttachment = {
  height?: number
  mediaType: string
  url: string
  width?: number
}

export type ThreadcapCommenter = {
  asof: Date
  fqUsername: string
  icon: ThreadcapCommenterIcon
  name?: string
  url: string
}

export type ThreadcapCommenterIcon = {
  mediaType: string
  url: string
}
