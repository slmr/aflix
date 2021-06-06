import CollectionView from '@/components/CollectionView'
import Layout from '@/components/Layout'
import { Box, Heading } from '@chakra-ui/react'
import { fetchNowPlayingTvSeriesUrl } from '@/constant/index'
import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'

const NowPlayingTvShowPage: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Tv Series on the Air | Aflix</title>
      </Head>
      <Box margin={'0 5%'} py={['55px']}>
        <Heading size="lg" mb={2} mt={6}>
          Tv Series on the Air
        </Heading>
        <CollectionView queryKey="on-the-air-tv" url={fetchNowPlayingTvSeriesUrl} mediaType="tv" />
      </Box>
    </Layout>
  )
}

export default NowPlayingTvShowPage
