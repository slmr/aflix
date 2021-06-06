import CollectionView from '@/components/CollectionView'
import Layout from '@/components/Layout'
import { Box, Heading } from '@chakra-ui/react'
import { fetchTopRatedTvSeriesUrl } from '@/constant/index'
import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'

const TopRatedTvShowPage: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>
          <title>Top Rated TV Show | Aflix</title>
        </title>
      </Head>
      <Box margin={'0 5%'} py={['55px']}>
        <Heading size="lg" mb={2} mt={6}>
          Top Rated TV Show
        </Heading>
        <CollectionView queryKey="top-rated-tv" url={fetchTopRatedTvSeriesUrl} mediaType="tv" />
      </Box>
    </Layout>
  )
}

export default TopRatedTvShowPage
