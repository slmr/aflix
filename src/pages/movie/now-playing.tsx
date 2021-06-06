import CollectionView from '@/components/CollectionView'
import Layout from '@/components/Layout'
import { Box, Heading } from '@chakra-ui/react'
import { fetchNowPlayingMovieUrl } from '@/constant/index'
import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'

const NowPlayingMoviesPage: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title> Movie in Theatre | Aflix</title>
      </Head>
      <Box margin={'0 5%'} py={['55px']}>
        <Heading size="lg" mb={2} mt={6}>
          Movie in Theatre
        </Heading>
        <CollectionView queryKey="now-playing-movie" url={fetchNowPlayingMovieUrl} mediaType="movie" />
      </Box>
    </Layout>
  )
}

export default NowPlayingMoviesPage
