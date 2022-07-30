import { NowPlayingItem } from "./nowPlayingItem"

export const extractSelectedEnclosureSourceAndContentType = (nowPlayingItem?: NowPlayingItem, alternateEnclosureIndexSelected?: number, alternateEnclosureSourceIndexSelected?: number) => {
  let src = ''
  let contentType

  if (nowPlayingItem?.episodeMediaUrl) {
    src = nowPlayingItem.episodeMediaUrl
  }

  if (nowPlayingItem?.episodeMediaType) {
    contentType = nowPlayingItem.episodeMediaType
  }

  if (
    nowPlayingItem
    && typeof alternateEnclosureIndexSelected !== 'undefined' 
    && typeof alternateEnclosureSourceIndexSelected !== 'undefined' 
    && typeof alternateEnclosureIndexSelected === 'number'
    && typeof alternateEnclosureSourceIndexSelected === 'number'
    && alternateEnclosureIndexSelected >= 0
    && alternateEnclosureSourceIndexSelected >= 0) {
    const alternateEnclosureSelected =
      nowPlayingItem.episodeAlternateEnclosures
      && nowPlayingItem.episodeAlternateEnclosures[alternateEnclosureIndexSelected]
    if (alternateEnclosureSelected) {
      const alternateEnclosureSourceSelected =
        alternateEnclosureSelected.source
        && alternateEnclosureSelected.source[alternateEnclosureSourceIndexSelected]
      if (alternateEnclosureSourceSelected) {
        src = alternateEnclosureSourceSelected.uri
        contentType = alternateEnclosureSourceSelected.contentType
      }
    }
  }

  return { contentType, src }
}
