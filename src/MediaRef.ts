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
