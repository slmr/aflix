import Episode from '@/components/Episode'
import Layout from '@/components/Layout'
import NextLink from '@/components/NextLink'
import { TvDetail } from '@/type/tv'
import { TvSeasonDetail } from '@/type/tv-season'
import axios from '@/utils/axios'
import { AspectRatio, Box, Divider, Flex, Grid, Heading, Icon, Skeleton, Stack, Text } from '@chakra-ui/react'
import useGetDetailVideo from '@/hooks/useGetDetailVideo'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import { IoArrowBack } from 'react-icons/io5'
import { useQuery } from 'react-query'
import dayjs from 'dayjs'

async function fetchData(id: string, seasonNumber: string) {
  const { data } = await axios.get(`tv/${id}/season/${seasonNumber}`)
  return data
}

const SeasonDetailPage: NextPage = () => {
  const router = useRouter()
  const { id, seasonNumber } = router.query
  const { data, status } = useQuery<TvSeasonDetail>(
    [`TvSeasonDetail`, id, seasonNumber],
    () => fetchData(id as string, seasonNumber as string),
    {
      refetchOnWindowFocus: false,
      enabled: Boolean(id) && Boolean(seasonNumber)
    }
  )
  const { data: dataTv, status: statusDataTv } = useGetDetailVideo<TvDetail>(id as string, 'tv')
  const isLoading = status === 'loading' && statusDataTv === 'loading'
  return (
    <Layout>
      <Head>
        <title>
          {statusDataTv === 'success' ? dataTv.name : status === 'error' ? 'Error' : ''}
          {status === 'success' ? ` : ${data.name}` : status === 'error' ? 'Error' : 'Loding...'} | Mofie
        </title>
      </Head>
      <Box pt={['55px', '68px']} margin="0 5%" mb={[2, 12]} minH="100vh">
        {isLoading && (
          <Box pt={4}>
            <Skeleton h="35px" w={['50vw', '30vw']} mx="auto" mb={4} />
            <Grid templateColumns="repeat(auto-fill, minmax(290px, 1fr))" gap={4}>
              {Array.from({ length: 8 }, (_, i) => (
                <Stack direction={['row', 'column']} key={i} spacing={2} align="flex-start">
                  <AspectRatio w="full" h="full" ratio={16 / 9} borderRadius="md">
                    <Skeleton h="full" w="full" />
                  </AspectRatio>
                  <Box w="full">
                    <Skeleton mb={2} h="20px" w={['80%', '40%']} />
                    <Skeleton h="20px" w={['40%', '20%']} />
                  </Box>
                </Stack>
              ))}
            </Grid>
          </Box>
        )}
        {status === 'success' && statusDataTv === 'success' && (
          <>
            {/* Header navigation */}
            <Box mb={4} pt={4}>
              <NextLink href={`/tv/${id}`}>
                <Flex justify="flex-start" align="center" color="gray.500">
                  <Icon as={IoArrowBack} boxSize={5} mr={1} />
                  <Text fontSize="xl">Back</Text>
                </Flex>
              </NextLink>
              <Flex align="center">
                <Heading size="lg">
                  {dataTv.name} : {data.name}
                  <Box ml={2} as="span" color="gray.500" fontWeight={400}>
                    ({dayjs(data.air_date).format('YYYY')})
                  </Box>
                </Heading>
              </Flex>
              <Divider mt={4} />
            </Box>
            <Box mb={[4, 8]}>
              <Heading size="lg" textAlign="center">
                {data.episodes.length} Episodes
              </Heading>
            </Box>
            {/* Episodes list */}
            <Grid templateColumns="repeat(auto-fill, minmax(290px, 1fr))" gridRowGap={[6, 12]} gridColumnGap={4}>
              {data.episodes.map((episode) => (
                <Episode key={episode.id} episode={episode} />
              ))}
            </Grid>
          </>
        )}
      </Box>
    </Layout>
  )
}

export default SeasonDetailPage
