import { Episode } from ".";

type Owner = {
  id: string
  isPublic: boolean
  name?: string
}

export type MediaRef = {
  id: string
  endTime: number | null
  imageUrl?: string | null
  isChapterToc?: boolean | null
  isOfficialChapter: boolean | null
  isOfficialSoundbite: boolean
  isPublic: boolean
  linkUrl?: string | null
  pastAllTimeTotalUniquePageviews: number
  pastHourTotalUniquePageviews: number
  pastDayTotalUniquePageviews: number
  pastWeekTotalUniquePageviews: number
  pastMonthTotalUniquePageviews: number
  pastYearTotalUniquePageviews: number
  startTime: number
  title?: string | null
  episode?: Episode
  owner?: Owner
}

export const getMediaRefStartPosition = (clipStartTime?: number | null, sliderWidth?: number, duration?: number) => {
  let clipStartTimePosition = 0

  if (duration && clipStartTime && sliderWidth) {
    clipStartTimePosition = sliderWidth * (clipStartTime / duration)
  }

  return clipStartTimePosition
}
