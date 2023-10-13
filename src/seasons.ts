import orderBy from 'lodash/orderBy'

type SeasonSection = {
  seasonKey: string
  orderByNumber: number
  title: string
  data: any[]
}

const _otherKey = 'otherKey'
const _trailerKey = 'trailer'
const _bonusKey = 'bonus'

type Params = {
  data: any[],
  querySort: string | null,
  extraParams: any,
  translator: any
  _oldestKey: string
  _mostRecentKey: string
}

type NewState = {
  hasSeasons: boolean
  querySort: string | null
  seasonSections: SeasonSection[]
}

export const getSeasonOrSerialEpisodesData = ({
  data,
  querySort,
  extraParams,
  translator,
  _oldestKey,
  _mostRecentKey
}: Params) => {
  const seasons: any = {}
  let seasonSections = []
  const ascSort = 'asc'
  const descSort = 'desc'

  let newState: NewState = {
    hasSeasons: false,
    querySort,
    seasonSections: []
  }

  if (!querySort && extraParams.isSerial) {
    querySort = _oldestKey
  }

  if (extraParams.hasSeasons) {
    for (const episode of data) {
      let seasonKey = parseInt(episode.itunesSeason, 10) >= 0 ? parseInt(episode.itunesSeason, 10) : _otherKey
      if (episode.itunesEpisodeType === _bonusKey) {
        seasonKey = `${seasonKey}_${_bonusKey}`
      }
      const seasonEpisodes = seasons[seasonKey] || []
      seasons[seasonKey] = seasonEpisodes
      seasonEpisodes.push(episode)
      seasons[seasonKey] = seasonEpisodes
    }

    let otherSection: SeasonSection = { seasonKey: '', title: '', data: [], orderByNumber: 0 }
    let otherBonusSection: SeasonSection = { seasonKey: '', title: '', data: [], orderByNumber: -1 }

    for (const seasonKey in seasons) {
      if (seasons.hasOwnProperty(seasonKey)) {
        const seasonNumber = seasonKey.split('_')[0]
        let orderByNumber = parseInt(seasonNumber, 10) || -1
        const isBonus = seasonKey.split('_')[1] === _bonusKey
        const isOther = seasonNumber === _otherKey

        let title = `${translator('Season')} ${seasonNumber}`
        if (isBonus) {
          orderByNumber = orderByNumber + 0.5
          const label = isOther ? translator('Other') : `${translator('Season')} ${seasonNumber}`
          title = `${label} - ${translator('Bonus')}`
        } else if (isOther) {
          // Other has the same orderByNumber as Other - Bonus (-0.5).
          orderByNumber = -0.5
          title = translator('Other')
        }
        
        const section = {
          orderByNumber,
          seasonKey,
          title,
          data: seasons[seasonKey]
        }

        if (isOther && isBonus) {
          otherBonusSection = section
        } else if (isOther) {
          otherSection = section
        } else {
          seasonSections.push(section)
        }
      }
    }

    if (querySort === _mostRecentKey) {
      seasonSections = orderBy(seasonSections, ['orderByNumber'], [descSort])
    } else if (querySort === _oldestKey) {
      seasonSections = orderBy(seasonSections, ['orderByNumber'], [ascSort])
    }

    if (otherSection?.data?.length > 0) {
      seasonSections.push(otherSection)
    }

    if (otherBonusSection?.data?.length > 0) {
      seasonSections.push(otherBonusSection)
    }

    const customItunesEpisodeOrderBy = (resultItem: any) => {
      return resultItem.itunesEpisodeType === _trailerKey
    }

    const finalSections: SeasonSection[] = []
    for (const section of seasonSections) {
      const data = section.data
      if (querySort === _mostRecentKey) {
        section.data = orderBy(data, [customItunesEpisodeOrderBy, 'itunesEpisode', 'pubDate'], [ascSort, descSort, descSort])
      } else if (querySort === _oldestKey) {
        section.data = orderBy(data, [customItunesEpisodeOrderBy, 'itunesEpisode', 'pubDate'], [descSort, ascSort, ascSort])
      }
      finalSections.push(section)
    }
    newState.seasonSections = finalSections
    newState.hasSeasons = true
  }
    
  newState.querySort = querySort

  return newState
}
