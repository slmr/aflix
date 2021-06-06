export interface Crew {
  id: number
  credit_id: string
  name: string
  department: string
  job: string
  gender: number
  profile_path: string
}

export interface GuestStar {
  id: number
  name: string
  credit_id: string
  character: string
  order: number
  gender: number
  profile_path: string
}

export interface Episode {
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
  crew: Crew[]
  guest_stars: GuestStar[]
}

export interface TvSeasonDetail {
  _id: string
  air_date: string
  episodes: Episode[]
  name: string
  overview: string
  id: number
  poster_path: string
  season_number: number
}
