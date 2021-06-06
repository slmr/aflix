import CollectionView from '@/components/CollectionView'
import Layout from '@/components/Layout'
import { Box, Heading } from '@chakra-ui/react'
import { fetchTrendingMovieUrl } from '@/constant/index'
import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'

const TrendingMoviesPage: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Trending Movie | Aflix</title>
      </Head>
      <Box margin={'0 5%'} py={['55px']}>
        <Heading size="lg" mb={2} mt={6}>
          Trending Movie
        </Heading>
        <CollectionView queryKey="trending-movie" url={fetchTrendingMovieUrl} mediaType="movie" />
      </Box>
    </Layout>
  )
}

export default TrendingMoviesPage
