type TranslatorSection = {
  language: string;
  translators: Translator[];
};

type Translator = {
  name: string;
  url?: string | null;
};

export const parseTranslatorsSection = (language: string, str: string) => {
  const splits = str.split(",");
  const translatorsSection: TranslatorSection = {
    language,
    translators: [],
  };
  for (const split of splits) {
    const name = split;
    // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
    const regexResults = name.match(new RegExp("<(.*?)>"));
    const url = regexResults && regexResults[1];
    const translator: Translator = {
      name: url ? name.substring(0, regexResults.index) : name,
      url,
    };
    translatorsSection.translators.push(translator);
  }
  return translatorsSection;
};
