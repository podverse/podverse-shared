export const logPerformance = (subject: string, stage = '', notes = '') => {
  console.log(
    subject + ',' + stage + ',' + Math.ceil(performance.now()).toString() + 'ms' + ',' + notes + ',' + new Date()
  )
}

export const _logStart = 'start'
export const _logEnd = 'end'
