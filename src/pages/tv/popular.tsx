import CollectionView from '@/components/CollectionView'
import Layout from '@/components/Layout'
import { Box, Heading } from '@chakra-ui/react'
import { fetchPopularTvSeriesUrl } from '@/constant/index'
import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'

const PopularTvPage: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Popular TV Show | Aflix</title>
      </Head>
      <Box margin={'0 5%'} py={['55px']}>
        <Heading size="lg" mb={2} mt={6}>
          Popular TV Show
        </Heading>
        <CollectionView queryKey="popular-tv" url={fetchPopularTvSeriesUrl} mediaType="tv" />
      </Box>
    </Layout>
  )
}

export default PopularTvPage
