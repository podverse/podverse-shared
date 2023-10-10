import orderBy from 'lodash/orderBy'

type SeasonSection = {
  seasonKey: string
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
  const oldestSort = 'asc'
  const recentSort = 'desc'

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

    let otherSection: SeasonSection = { seasonKey: '', title: '', data: [] }
    let otherBonusSection: SeasonSection = { seasonKey: '', title: '', data: [] }

    for (const seasonKey in seasons) {
      if (seasons.hasOwnProperty(seasonKey)) {
        const seasonNumber = seasonKey.split('_')[0]
        const isBonus = seasonKey.split('_')[1] === _bonusKey
        const isOther = seasonNumber === _otherKey

        let title = `${translator('Season')} ${seasonNumber}`
        if (isBonus) {
          const label = isOther ? translator('Other') : `${translator('Season')} ${seasonNumber}`
          title = `${label} - ${translator('Bonus')}`
        } else if (isOther) {
          title = translator('Other')
        }
        
        const section = {
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
      seasonSections = orderBy(seasonSections, ['title'], recentSort)
    } else if (querySort === _oldestKey) {
      seasonSections = orderBy(seasonSections, ['title'], oldestSort)
    }

    if (otherSection?.data?.length > 0) {
      seasonSections.push(otherSection)
    }

    if (otherBonusSection?.data?.length > 0) {
      seasonSections.push(otherBonusSection)
    }

    const finalSections: SeasonSection[] = []
    for (const section of seasonSections) {
      const data = section.data
      if (querySort === _mostRecentKey) {
        section.data = orderBy(data, ['itunesEpisode'], recentSort)
      } else if (querySort === _oldestKey) {
        section.data = orderBy(data, ['itunesEpisode'], oldestSort)
      }
      finalSections.push(section)
    }
    newState.seasonSections = finalSections
    newState.hasSeasons = true
  }
    
  newState.querySort = querySort

  return newState
}
