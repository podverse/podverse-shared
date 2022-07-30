export type Author = {
  id: string
  int_id: string
  name: string
  slug: string
}

export const generateAuthorsText = (authors: any) => {
  let authorText = ''

  if (authors) {
    for (let i = 0; i < authors.length; i++) {
      const author = authors[i]
      authorText += `${author.name}${i < authors.length - 1 ? ', ' : ''}`
    }
  }

  return authorText
}
