
import striptags from 'striptags'
import { checkIfAllowedImageOrigin, removeUsernamesFromBeginningOfString } from './ActivityPub'
import { PVComment } from './PVComment'
import { decodeHtml, getLocationURL } from '../util'

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

const parseUserInfo = (comment: any, protocol: string, commenters: { [key: string]: ThreadcapCommenter }) => {
  let username = ''
  let profileIcon = ''
  const commenter = commenters[comment.attributedTo]

  if (protocol === 'activitypub' || protocol === 'mastodon') {
    const url = getLocationURL(comment.attributedTo)
    if (url) {
      const hostname = url.hostname
      const segments = url.pathname.split('/')
      const last = segments.pop() || segments.pop() // Handle potential trailing slash
      if (hostname && last) {
        username = `${last}@${hostname}`
      }
    }

    const isAllowedImageOrigin = checkIfAllowedImageOrigin(commenter)
    if (isAllowedImageOrigin) {
      profileIcon = commenter.icon?.url || ''
    }
  } else if (protocol === 'twitter') {
    username = commenter.fqUsername
    profileIcon = commenter.icon?.url || ''
  }

  return { profileIcon, username }
}

const getAttachmentImage = (attachments: ThreadcapAttachment[] | null) => {
  return attachments?.find((attachment: ThreadcapAttachment) => attachment?.mediaType?.indexOf('image') === 0)
}

export const convertThreadcapResponseToPVComment = (response: ThreadcapResponse) => {
  const { commenters, nodes, protocol, roots } = response
  const root = roots[0]
  const rootNode = nodes[root]

  const generatePVComment = (node: ThreadcapNode, protocol: string) => {
    const { comment, replies } = node
    const { attachments, content, published, url } = comment

    const nestedReplies = Array.isArray(replies)
      ? replies.map((replyUrl: string) => {
        const nestedNode = nodes[replyUrl]
        let pvComment = null
        if (nestedNode && !nestedNode.commentError) {
          pvComment = generatePVComment(nestedNode, protocol)
          return pvComment
        }
      })
      : []

    const contentKeys = content && typeof content === 'object' ? Object.keys(content) : []
    const contentLangKey = contentKeys[0]

    let cleanedContent = contentLangKey ? decodeHtml(striptags(content[contentLangKey])) : ''
    cleanedContent = removeUsernamesFromBeginningOfString(cleanedContent)
    const attachmentImage = getAttachmentImage(attachments)
    const { profileIcon, username } = parseUserInfo(comment, protocol, commenters)

    const pvComment: PVComment = {
      content: cleanedContent,
      imageUrl: attachmentImage?.url || null,
      profileIcon,
      published,
      replies: nestedReplies as any,
      url,
      username
    }

    return pvComment
  }

  const pvCommentThread = generatePVComment(rootNode, protocol)
  return pvCommentThread
}
