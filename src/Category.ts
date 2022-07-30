export type Category = {
  id: string
  int_id: string
  fullPath: string
  slug: string
  title: string
}

export const generateCategoriesText = (categories: any) => {
  let categoryText = ''

  if (categories) {
    for (let i = 0; i < categories.length; i++) {
      const category = categories[i]
      categoryText += `${category.title}${i < categories.length - 1 ? ', ' : ''}`
    }
  }

  return categoryText
}

export const generateCategoryItems = (categories: any[]) => {
  const items = []

  if (categories && categories.length > 0) {
    for (const category of categories) {
      items.push({
        label: category?.title,
        value: category?.id
      })
    }
  }

  return items
}
