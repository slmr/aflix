export interface CreatedBy {
  id: number
  credit_id: string
  name: string
  gender: number
  profile_path: string
}

export interface Genre {
  id: number
  name: string
}

export interface LastEpisodeToAir {
  air_date: string
  episode_number: number
  id: number
  name: string
  overview: string
  production_code: string
  season_number: number
  show_id: number
  still_path: string
  vote_average: number
  vote_count: number
}

export interface Network {
  name: string
  id: number
  logo_path: string
  origin_country: string
}

export interface ProductionCompany {
  id: number
  logo_path: string
  name: string
  origin_country: string
}

export interface Season {
  air_date: string
  episode_count: number
  id: number
  name: string
  overview: string
  poster_path: string
  season_number: number
}

export interface ContentRatings {
  results: [
    {
      iso_3166_1: string
      rating: number
    }
  ]
}

export interface Cast {
  cast_id: number
  character: string
  credit_id: string
  gender: number
  id: number
  name: string
  order: number
  profile_path: string
}

export interface Crew {
  credit_id: string
  department: string
  gender: number
  id: number
  job: string
  name: string
  profile_path: string
}

export interface Credits {
  cast: Cast[]
  crew: Crew[]
}

export interface Keyword {
  id: string
  name: string
}

export interface Keywords {
  results: Keyword[]
}

export interface ExternalIds {
  imdb_id: string
  facebook_id: string
  instagram_id: string
  twitter_id: string
}
export interface Video {
  id: string
  iso_639_1: string
  iso_3166_1: string
  key: string
  name: string
  site: string
  size: number
  type: string
}

export interface Videos {
  results: Video[]
}

export interface TvDetail {
  backdrop_path: string
  created_by: CreatedBy[]
  credits: Credits
  content_ratings: ContentRatings
  episode_run_time: number[]
  external_ids: ExternalIds
  first_air_date: string
  genres: Genre[]
  homepage: string
  id: number
  in_production: boolean
  keywords: Keywords
  languages: string[]
  last_air_date: string
  last_episode_to_air: LastEpisodeToAir
  name: string
  next_episode_to_air?: any
  networks: Network[]
  number_of_episodes: number
  number_of_seasons: number
  origin_country: string[]
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: ProductionCompany[]
  seasons: Season[]
  status: string
  type: string
  videos: Videos
  vote_average: number
  vote_count: number
}

export interface TvSeriesResponse {
  page: number
  results: TvDetail[]
  total_results: number
  total_pages: number
}
