import CollectionView from '@/components/CollectionView'
import Layout from '@/components/Layout'
import { Box, Heading } from '@chakra-ui/react'
import { fetchTopRatedMovieUrl } from '@/constant/index'
import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'

const TopRatedMoviesPage: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Top Rated Movie | Aflix</title>
      </Head>
      <Box margin={'0 5%'} py={['55px']}>
        <Heading size="lg" mb={2} mt={6}>
          Top Rated Movie
        </Heading>
        <CollectionView queryKey="top-rated-movie" url={fetchTopRatedMovieUrl} mediaType="movie" />
      </Box>
    </Layout>
  )
}

export default TopRatedMoviesPage
