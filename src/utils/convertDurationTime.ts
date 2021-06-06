function convertDutarionTime(duration: number): string {
  let result = ''
  const hours = (duration / 60).toString().split('.')[0]
  const differentMinutes = duration - parseInt(hours, 10) * 60
  const minutes = differentMinutes % 60 === 0 ? 0 : differentMinutes.toString()

  if (hours !== '0') {
    result += `${hours}h`
  }
  if (minutes !== '0') {
    result += ` ${minutes}m`
  }
  return result
}

export default convertDutarionTime
