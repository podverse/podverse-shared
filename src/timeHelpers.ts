import moment from 'moment'

export const convertHHMMSSToAnchorTags = (html: string) => {
  const createHHMMSSAnchorTag = (hhmmss: string) => {
    const sec = convertHHMMSSToSeconds(hhmmss)
    return `<a data-start-time='${sec}' href='#'>${hhmmss}</a>`
  }

  if (html) {
    const matches = getHHMMSSMatchesInString(html) || []
    let formattedHtml = html
    for (const match of matches) {
      const replace = match
      const regex = new RegExp(replace, 'g')
      const anchorTag = createHHMMSSAnchorTag(match)
      formattedHtml = formattedHtml.replace(regex, anchorTag)
    }

    return formattedHtml
  }
  return html
}

export function convertHHMMSSToSeconds(hhmmssString: string) {
  if (hhmmssString) {
    if (!validateHHMMSSString(hhmmssString)) {
      return -1
    }

    const hhmmssArray = hhmmssString.split(':') || 0
    let hours = 0
    let minutes = 0
    let seconds = 0

    if (hhmmssArray.length === 3) {
      hours = parseInt(hhmmssArray[0], 10)
      minutes = parseInt(hhmmssArray[1], 10)
      seconds = parseInt(hhmmssArray[2], 10)

      if (hours < 0 || minutes > 59 || minutes < 0 || seconds > 59 || seconds < 0) {
        console.log('Invalid time provided.')
        return -1
      }

      hours = hours * 3600
      minutes = minutes ? minutes * 60 : 0
    } else if (hhmmssArray.length === 2) {
      minutes = parseInt(hhmmssArray[0], 10)
      seconds = parseInt(hhmmssArray[1], 10)

      if (minutes > 59 || minutes < 0 || seconds > 59 || seconds < 0) {
        console.log('Invalid time provided.')
        return -1
      }

      minutes = minutes * 60
    } else if (hhmmssArray.length === 1) {
      seconds = parseInt(hhmmssArray[0], 10) || 0

      if (seconds > 59 || seconds < 0) {
        console.log('Invalid time provided.')
        return -1
      }
    } else {
      console.log('Invalid time provided.')
      return -1
    }

    return hours + minutes + seconds
  } else {
    return null
  }
}

export function convertHoursMinutesSecondsToSeconds(hours: number, minutes: number, seconds: number) {
  let totalSeconds = hours * 3600
  totalSeconds += minutes * 60
  totalSeconds += seconds
  return totalSeconds
}

export const convertSecToFullHHMMSS = (sec: number) => {
  return moment.utc(sec * 1000).format('HH:mm:ss')
}

export const convertSecToHHMMSS = (sec: number) => {
  let totalSec = Math.floor(sec)
  const hours = Math.floor(totalSec / 3600)
  totalSec %= 3600
  const minutes = Math.floor(totalSec / 60)
  const seconds = Math.floor(totalSec % 60)
  let result = ''

  if (hours >= 1) {
    result += hours + ':'
  }

  if (minutes >= 10) {
    result += minutes + ':'
  } else if (minutes >= 1 && hours >= 1) {
    result += '0' + minutes + ':'
  } else if (minutes >= 1) {
    result += minutes + ':'
  } else if (minutes === 0 && hours >= 1) {
    result += '00:'
  }

  if (seconds >= 10) {
    result += seconds
  } else if (seconds >= 1) {
    result += '0' + seconds
  } else {
    result += '00'
  }

  if (result.length === 2) {
    result = '0:' + result
  }

  if (result.length === 1) {
    result = '0:0' + result
  }

  return result
}

export const convertSecToHhoursMMinutes = (sec: number) => {
  let totalSec = Math.floor(sec)

  const hours = Math.floor(totalSec / 3600)
  totalSec %= 3600

  const minutes = Math.floor(totalSec / 60)
  let result = `${minutes} min`

  if (hours >= 1) {
    result = `${hours} hr ` + result
  }

  return result
}

export const getHHMMSSArray = (sec: number) => {
  sec = sec > -1 ? sec : 0
  const str = convertSecToHHMMSS(sec)
  const delimitedArray = str.split(':')

  if (delimitedArray.length === 1) {
    delimitedArray.unshift('0')
    delimitedArray.unshift('0')
  } else if (delimitedArray.length === 2) {
    delimitedArray.unshift('0')
  }

  const parsedArray = delimitedArray.map((x) => parseInt(x, 10))
  return parsedArray
}

export const getHHMMSSMatchesInString = (str: string) => {
  const regex = /([0-9]?[0-9]:[0-5]?[0-9]:[0-5][0-9])|([0-5]?[0-9]:[0-5][0-9])/g
  return str.match(regex)
}

export const getTimeLabelText = (
  mediaFileDuration?: number,
  episodeDuration?: number,
  userPlaybackPosition?: number,
  completed?: boolean,
  clipTime?: string
) => {
  const hasStartedItem = !!mediaFileDuration
  const totalTime = mediaFileDuration || episodeDuration || 0
  const playedTime = userPlaybackPosition || 0

  let timeLabel = ''
  if (totalTime) {
    timeLabel = convertSecToHhoursMMinutes(totalTime)
    if (hasStartedItem && playedTime > 0) {
      timeLabel = convertSecToHhoursMMinutes(totalTime - playedTime)
    }
  }

  if (clipTime) {
    timeLabel = clipTime
  }

  return timeLabel
}

export function validateHHMMSSString(hhmmss: string) {
  const regex = new RegExp(
    // eslint-disable-next-line max-len
    '^(([0-9][0-9]):([0-5][0-9]):([0-5][0-9]))$|(([0-9]):([0-5][0-9]):([0-5][0-9]))$|^(([0-5][0-9]):([0-5][0-9]))$|^(([0-9]):([0-5][0-9]))$|^([0-5][0-9])$|^([0-9])'
  )
  return regex.test(hhmmss)
}
