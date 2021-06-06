import Layout from '@/components/Layout'
import GenreList from '@/components/GenreList'
import Loading from '@/components/Loading'
import VideoList from '@/components/VideoList'
import { Box, Container, Heading } from '@chakra-ui/react'
import {
  fetchNowPlayingTvSeriesUrl,
  fetchPopularTvSeriesUrl,
  fetchTopRatedTvSeriesUrl,
  fetchTrendingTvSeriesUrl
} from '@/constant/index'
import useGetGenres from '@/hooks/useGetGenres'
import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'

const TvSeriesIndexPage: NextPage = () => {
  const { data, status } = useGetGenres('tv')
  return (
    <Layout>
      <Head>
        <title>Tv Show | Aflix</title>
      </Head>
      <Box minHeight="100vh" pt="55px" overflow="hidden" position="relative">
        <Box mb={[6]} mt={[2, 12]} mx="5%">
          <VideoList
            title="Trending Tv Series of the Week"
            fetchKey="trending-tv"
            fetchUrl={fetchTrendingTvSeriesUrl}
            link="/tv/trending"
          />
        </Box>
        <Box mb={[6]} mt={[2, 12]} mx="5%">
          <VideoList
            title="Tv Series on the Air"
            fetchKey="on-the-air-tv"
            fetchUrl={fetchNowPlayingTvSeriesUrl}
            link="/tv/now-playing"
            mediaType="tv"
          />
        </Box>
        <Box mb={[6]} mt={[2, 12]} mx="5%">
          <VideoList
            title="Popular Tv Series"
            fetchKey="popular-tv"
            fetchUrl={fetchPopularTvSeriesUrl}
            link="/tv/popular"
            mediaType="tv"
          />
        </Box>
        <Box mb={[6]} mt={[2, 12]} mx="5%">
          <VideoList
            title="Top Rated Tv Series"
            fetchKey="top-rated-tv"
            fetchUrl={fetchTopRatedTvSeriesUrl}
            link="/tv/top-rated"
            mediaType="tv"
          />
        </Box>
        <Box mb={[6]} mt={[2, 12]} mx="5%">
          <Heading fontSize={['xl', '2xl']} fontWeight="bold" mb={2}>
            Browse Tv Series Genre
          </Heading>
          {status === 'loading' && <Loading />}
          {status === 'success' && <GenreList genres={data} mediaType="tv" />}
        </Box>
      </Box>
    </Layout>
  )
}
export default TvSeriesIndexPage
