import { useQuery, UseQueryResult } from 'react-query'
import { fetchMovieUrl, fetchTvUrl } from '../constant'
import { MediaType } from '../type/movie'
import axiosInstance from '../utils/axios'

async function fetchData(id: number | string, mediaType: Exclude<MediaType, 'person'>) {
  const { data } = await axiosInstance.get(`${mediaType === 'movie' ? fetchMovieUrl(id) : fetchTvUrl(id)}`)
  return data
}

function useGetDetailVideo<T>(id: number | string, mediaType: Exclude<MediaType, 'person'>){
  return useQuery<T>([`getDetail`, id, mediaType], () => fetchData(id, mediaType), {
    refetchOnWindowFocus: false,
    enabled: Boolean(id)
  })
}

export default useGetDetailVideo
