import { SearchType } from '../type/movie'

const fetchTrendingUrl = `/trending/all/week`
const fetchImageUrl = `https://image.tmdb.org/t/p/original`
const fetchMovieUrl = (id: number | string): string =>
  `/movie/${id}?append_to_response=release_dates,credits,external_ids,videos,keywords`
const fetchTvUrl = (id: number | string): string =>
  `/tv/${id}?append_to_response=content_ratings,credits,external_ids,videos,keywords`

const fetchSimilarUrl = (mediaType: 'movie' | 'tv', id: string | number): string => `/${mediaType}/${id}/similar`
const fetchRecommendationsUrl = (mediaType: 'movie' | 'tv', id: string | number): string =>
  `/${mediaType}/${id}/recommendations`
const fetchKeywordUrl = (id: string | number): string => `/keyword/${id}`

const fetchNowPlayingMovieUrl = '/movie/now_playing'
const fetchTrendingMovieUrl = '/trending/movie/week'
const fetchPopularMovieUrl = '/movie/popular'
const fetchTopRatedMovieUrl = '/movie/top_rated'

const fetchNowPlayingTvSeriesUrl = '/tv/on_the_air'
const fetchPopularTvSeriesUrl = '/tv/popular'
const fetchTrendingTvSeriesUrl = '/trending/tv/week'
const fetchTopRatedTvSeriesUrl = '/tv/top_rated'

const fetchDiscoverByGenresUrl = (type: 'movie' | 'tv', genreId: string): string =>
  `/discover/${type}?sort_by=popularity.desc&with_genres=${genreId}`
const fetchDiscoverMoviesUrl = `/discover/movie?sort_by=popularity.desc`
const fetchSearcUrl = (mediaType: SearchType = 'multi', query: string): string =>
  `/search/${mediaType}?query=${query}`

const fetchGenresUrl = (selected: 'movie' | 'tv'): string => `https://api.themoviedb.org/3/genre/${selected}/list`

export {
  fetchTrendingMovieUrl,
  fetchTrendingTvSeriesUrl,
  fetchDiscoverMoviesUrl,
  fetchGenresUrl,
  fetchTvUrl,
  fetchSearcUrl,
  fetchTrendingUrl,
  fetchImageUrl,
  fetchMovieUrl,
  fetchSimilarUrl,
  fetchRecommendationsUrl,
  fetchNowPlayingMovieUrl,
  fetchPopularMovieUrl,
  fetchTopRatedMovieUrl,
  fetchNowPlayingTvSeriesUrl,
  fetchPopularTvSeriesUrl,
  fetchTopRatedTvSeriesUrl,
  fetchDiscoverByGenresUrl,
  fetchKeywordUrl
}

