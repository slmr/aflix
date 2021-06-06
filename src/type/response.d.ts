import { MediaType, MovieDetail } from './movie'
import { TvDetail } from './tv'

export interface ResponseGeneral {
  page: number
  results: ResponseGeneralResults[]
  total_results: number
  total_pages: number
}

export type ResponseGeneralResults = TvDetail & MovieDetail & { media_type: MediaType, genre_ids: number[] }
