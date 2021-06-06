import { Genre, MediaType } from '@/type/movie'
import axios from '@/utils/axios'
import { fetchGenresUrl } from '@/constant/index'
import { UseQueryResult, useQuery } from 'react-query'

async function fetchGenres(movieOrTv: Exclude<MediaType, 'person'>) {
  const { data } = await axios.get<{ genres: Genre[] }>(fetchGenresUrl(movieOrTv))
  return data.genres
}

function useGetGenres(mediaType: Exclude<MediaType, 'person'>): UseQueryResult<Genre[], unknown> {
  return useQuery<Genre[]>(['genres', mediaType], () => fetchGenres(mediaType), { refetchOnWindowFocus: false })
}

export default useGetGenres
