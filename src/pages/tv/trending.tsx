import CollectionView from '@/components/CollectionView'
import Layout from '@/components/Layout'
import { Box, Heading } from '@chakra-ui/react'
import { fetchTrendingTvSeriesUrl } from '@/constant/index'
import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'

const TrendingTvShowPage: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Trending TV Show | Aflix</title>
      </Head>
      <Box margin={'0 5%'} py={['55px']}>
        <Heading size="lg" mb={2} mt={6}>
          Trending TV Show
        </Heading>
        <CollectionView queryKey="trending-tv" url={fetchTrendingTvSeriesUrl} mediaType="tv" />
      </Box>
    </Layout>
  )
}

export default TrendingTvShowPage
