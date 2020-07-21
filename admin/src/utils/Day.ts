import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

class Day {

  public static translateToLocalISOString(date: string | Date) {
    const isoString = dayjs.utc(date)
    return isoString.local().format()
  }

  public static format(date: string | Date) {
    return dayjs(this.translateToLocalISOString(date)).format('YYYY-MM-DD HH:mm:ss')
  }

}

export default Day