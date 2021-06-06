import { Crew } from '../type/movie'

export default function getJob(
  crew: Crew[]
): {
  director: Crew[]
  producer: Crew[]
  screenplay: Crew[]
} {
  return crew.reduce(
    (accumularor, currentValue) => {
      switch (currentValue.job) {
        case 'Director':
          accumularor.director.push(currentValue)
          break
        case 'Producer':
          accumularor.producer.push(currentValue)
          break
        case 'Screenplay':
          accumularor.screenplay.push(currentValue)
          break
        default:
          break
      }
      return accumularor
    },
    { director: [], producer: [], screenplay: [] }
  )
}
