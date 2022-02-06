export type PVComment = {
  content: string | null
  imageUrl: string | null
  isRoot?: boolean // set true if the top level comment
  // likesCount: number
  published: Date | null
  replies: PVComment[]
  // repliesCount: number
  // retweetsCount: number
  url: string | null
  username: string | null
}
