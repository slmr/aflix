import { ResultReleaseDates } from '../type/movie'

function getUsCertificate(releaseDates: ResultReleaseDates[]): string | null {
  const findUs = releaseDates.find((releaseDate) => releaseDate.iso_3166_1 === 'US')

  return findUs?.release_dates[0]?.certification || null
}

export default getUsCertificate
