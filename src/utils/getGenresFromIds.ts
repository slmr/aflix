import dataGenres from '@/constant/genres.json'
import { Genre, MediaType } from '@/type/movie'

const getGenresFromIds = (genreIds: number[], mediaType: Exclude<MediaType, 'person'>) => {
  let genres: Genre[]
  switch (mediaType) {
    case 'movie':
      genres = dataGenres.movies.filter((genre) =>
        genreIds.includes(genre.id)
      )
      break;
    case 'tv':
      genres = dataGenres.tv.filter((genre) =>
        genreIds.includes(genre.id)
      )
      break;

    default:
      genres = []
      break;
  }
  return genres
}

export default getGenresFromIds
