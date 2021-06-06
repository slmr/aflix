import CollectionView from '@/components/CollectionView'
import Layout from '@/components/Layout'
import { Box, Heading } from '@chakra-ui/react'
import { fetchPopularMovieUrl } from '@/constant/index'
import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'

const PopularMoviesPage: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Popular Movies | Aflix</title>
      </Head>
      <Box margin={'0 5%'} py={['55px']}>
        <Heading size="lg" mb={2} mt={6}>
          Popular movies
        </Heading>
        <CollectionView queryKey="popular-movie" url={fetchPopularMovieUrl} mediaType="movie" />
      </Box>
    </Layout>
  )
}

export default PopularMoviesPage
