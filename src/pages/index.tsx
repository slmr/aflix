import { AspectRatio, Box, Container, Flex, Heading, Skeleton, Stack } from '@chakra-ui/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import Layout from '@/components/Layout'
import SearchInput from '@/components/SearchInput'
import VideoList from '@/components/VideoList'
import {
  fetchDiscoverByGenresUrl,
  fetchPopularMovieUrl,
  fetchPopularTvSeriesUrl,
  fetchTrendingMovieUrl,
  fetchTrendingUrl
} from '../constant'
import Banner from '@/components/Banner'
import axiosInstance from '@/utils/axios'
import { useQuery } from 'react-query'

function Home(): JSX.Element {
  const router = useRouter()
  const { data, status } = useQuery('trending-all-week', async () => {
    const { data } = await axiosInstance.get(fetchTrendingUrl)
    return data.results.splice(0, 5)
  })

  return (
    <Layout>
      <Head>
        <title>Home | Aflix</title>
      </Head>
      <Box minHeight="100vh" mt="55px">
        <Box mb={[6, 0]}>
          {status === 'loading' && (
            <AspectRatio ratio={[3 / 2, 3 / 1]}>
              <Skeleton w="full" h="full" />
            </AspectRatio>
          )}
          {status === 'success' && <Banner video={data[0]} />}
        </Box>
        <Box className="container-video-list" overflow="hidden" pb={[12, 16]} position="relative">
          <Box mb={[6]} mt={[2, 12]} mx="5%">
            <VideoList
              title="Trending Movies this week"
              fetchKey="trending-movies-week"
              fetchUrl={fetchTrendingMovieUrl}
              link="/trending/movie/week"
            />
          </Box>

          <Box mb={[6]} mt={[2, 12]} mx="5%">
            <VideoList
              mediaType="movie"
              title="Popular Movies"
              mode="vertical"
              fetchKey="popular-movie"
              fetchUrl={fetchPopularMovieUrl}
              link="/movie/popular"
            />
          </Box>
          <Box mb={[6]} mt={[2, 12]} mx="5%">
            <VideoList
              mediaType="tv"
              title="Popular TV Series"
              mode="vertical"
              fetchKey="popular-tv"
              fetchUrl={fetchPopularTvSeriesUrl}
              link="/tv/popular"
            />
          </Box>
          <Box mb={[6, 0]}>
            {status === 'loading' && (
              <AspectRatio ratio={[3 / 2, 3 / 1]}>
                <Skeleton w="full" h="full" />
              </AspectRatio>
            )}
            {status === 'success' && <Banner video={data[1]} />}
          </Box>
          <Box mb={[6]} mt={[2, 12]} mx="5%">
            <VideoList
              mediaType="movie"
              title="Thriller movies"
              fetchKey="movies_genre_thriller"
              fetchUrl={fetchDiscoverByGenresUrl('movie', '53')}
              link="/movie/genres/53-Thriller"
            />
          </Box>
          <Box mb={[6]} mt={[2, 12]} mx="5%">
            <VideoList
              mediaType="movie"
              title="Drama movies"
              mode="vertical"
              fetchKey="movies_genre_drama"
              fetchUrl={fetchDiscoverByGenresUrl('movie', '18')}
              link="/movie/genres/18-Drama"
            />
          </Box>
          <Box mb={[6]} mt={[2, 12]} mx="5%">
            <VideoList
              mediaType="movie"
              title="Horror movies"
              mode="vertical"
              fetchKey="movies_genre_horror"
              fetchUrl={fetchDiscoverByGenresUrl('movie', '27')}
              link="/movie/genres/27-Horror"
            />
          </Box>
          <Box mb={[6, 0]}>
            {status === 'loading' && (
              <AspectRatio ratio={[3 / 2, 3 / 1]}>
                <Skeleton w="full" h="full" />
              </AspectRatio>
            )}
            {status === 'success' && <Banner video={data[2]} />}
          </Box>
        </Box>
      </Box>
    </Layout>
  )
}

export default Home
