import Layout from '@/components/Layout'
import GenreList from '@/components/GenreList'
import Loading from '@/components/Loading'
import VideoList from '@/components/VideoList'
import { Box, Container, Heading } from '@chakra-ui/react'
import { fetchNowPlayingMovieUrl, fetchPopularMovieUrl, fetchTopRatedMovieUrl, fetchTrendingMovieUrl } from '@/constant/index'
import useGetGenres from '@/hooks/useGetGenres'
import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'

const MoviesIndexPage: NextPage = () => {
  const { data, status } = useGetGenres('movie')
  return (
    <Layout>
      <Head>
        <title>Movie | Aflix</title>
      </Head>
      <Container maxW="xl" minHeight="100vh" pt={['55px', '68px']}>
        <Box mb={[6]} mt={[2, 12]} mr={[-2, 0]}>
          <VideoList
            title="Trending Movie of the Week"
            fetchKey="trending-movie"
            fetchUrl={fetchTrendingMovieUrl}
            link="/movie/trending"
          />
        </Box>
        <Box mb={[6]} mt={[2, 12]} mr={[-2, 0]}>
          <VideoList
            title="Movie in Theatre"
            fetchKey="now-playing-movie"
            fetchUrl={fetchNowPlayingMovieUrl}
            link="/movie/now-playing"
            mediaType="movie"
          />
        </Box>
        <Box mb={[6]} mt={[2, 12]} mr={[-2, 0]}>
          <VideoList
            title="Popular Movie"
            fetchKey="popular-movie"
            fetchUrl={fetchPopularMovieUrl}
            link="/movie/popular"
            mediaType="movie"
          />
        </Box>
        <Box mb={[6]} mt={[2, 12]} mr={[-2, 0]}>
          <VideoList
            title="Top Rated Movie"
            fetchKey="top-rated-movie"
            fetchUrl={fetchTopRatedMovieUrl}
            link="/movie/top-rated"
            mediaType="movie"
          />
        </Box>
        <Box mb={[6]} mt={[2, 12]} mr={[-2, 0]}>
          <Heading fontSize={['xl', '2xl']} fontWeight="bold" mb={2}>
            Browse Movie Genre
          </Heading>
          {status === 'loading' && <Loading />}
          {status === 'success' && <GenreList genres={data} mediaType="movie" />}
        </Box>
      </Container>
    </Layout>
  )
}
export default MoviesIndexPage
