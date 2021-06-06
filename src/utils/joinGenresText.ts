import { Genre, MediaType } from '../type/movie'

export function serializeMediaTypeName(mediaType: MediaType): string {
  let mediaTypeText = ''
  switch (mediaType) {
    case 'movie':
      mediaTypeText = 'Movie'
      break
    case 'person':
      mediaTypeText = 'Person'
      break
    default:
      mediaTypeText = 'Tv Series'
      break
  }
  return mediaTypeText
}

interface GetGenreText {
  genres: Genre[]
}
const getGenreText = ({ genres }: GetGenreText): string =>
  genres.reduce(
    (genreText, currentValue, index, array) =>
      array.length === index + 1 ? (genreText += `${currentValue.name} `) : (genreText += `${currentValue.name}, `),
    ''
  )

export default getGenreText
