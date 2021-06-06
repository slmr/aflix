export interface Genre {
  id: number
  name: string
}

export interface ProductionCompany {
  id: number
  logo_path: string
  name: string
  origin_country: string
}

export interface Keyword {
  id: string
  name: string
}

export interface ResultReleaseDates {
  iso_3166_1: string
  release_dates: ReleaseDate[]
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
export interface ExternalIds {
  imdb_id: string
  facebook_id: string
  instagram_id: string
  twitter_id: string
}

export interface ProductionCountry {
  iso_3166_1: string
  name: string
}

export interface SpokenLanguage {
  iso_639_1: string
  name: string
}

export interface ReleaseDate {
  certification: string
  iso_639_1: string
  note: string
  release_date: Date
  type: number
}

export interface ReleaseDatesResult {
  iso_3166_1: string
  release_dates: ReleaseDate[]
}

export interface ReleaseDates {
  results: ReleaseDatesResult[]
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

export interface MovieDetail {
  adult: boolean
  backdrop_path: string
  belongs_to_collection?: any
  budget: number
  credits: Credits
  external_ids: ExternalIds
  genres: Genre[]
  homepage: string
  id: number
  imdb_id: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: ProductionCompany[]
  production_countries: ProductionCountry[]
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: SpokenLanguage[]
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
  release_dates: ReleaseDates
  videos: {
    results: Video[]
  }
  keywords: {
    keywords: Keyword[]
  }
}

export type SortBy = 'popularity' | 'release_date' | 'revenue' | 'original_title' | 'vote_average' | 'vote_count'
export type OrderBy = 'desc' | 'asc'

export type MediaType = 'movie' | 'person' | 'tv'

export type SearchType = MediaType | 'multi'

export interface MoviesResponse {
  page: number
  results: MovieDetail[]
  total_results: number
  total_pages: number
}
