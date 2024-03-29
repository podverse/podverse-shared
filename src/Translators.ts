export type TranslatorsSection = {
  language: string
  translators: Translator[]
}

export type Translator = {
  name: string
  url?: string | null
}

export const parseTranslatorsSection = (language: string, str: string) => {
  const splits = str.split(",")
  const translatorsSection: TranslatorsSection = {
    language,
    translators: [],
  }
  for (const split of splits) {
    const name = split || ''
    // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
    const regexResults = name.match(new RegExp("<(.*?)>"))
    const url = regexResults && regexResults[1]
    const translator: Translator = {
      name: url && regexResults && name ? name.substring(0, regexResults.index).trim() : name.trim(),
      url,
    }

    if (translator.name) {
      translatorsSection.translators.push(translator)
    }
  }
  return translatorsSection
}
