import Error from '@/components/Error'
import Image from '@/components/Image'
import Layout from '@/components/Layout'
import Loading from '@/components/Loading'
import NextLink from '@/components/NextLink'
import useGetDetailVideo from '@/hooks/useGetDetailVideo'
import { TvDetail } from '@/type/tv'
import { AspectRatio, Box, Container, Divider, Flex, Heading, Icon, List, ListItem, Text } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import { MdArrowBack, MdMovie } from 'react-icons/md'

const SeasonsPage: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  const { data, status, error } = useGetDetailVideo<TvDetail>(id as string, 'tv')
  return (
    <Layout>
      <Head>
        <title>{`${data?.original_name} (${dayjs(data?.first_air_date).format('YYYY')}) Seasons | Aflix`}</title>
      </Head>
      <Container maxW="xl" mt={['55px', '68px']} minHeight="100vh" mb={24}>
        {status === 'loading' && <Loading />}{' '}
        {status === 'error' && <Error message={(error as any).name} description={(error as any).message} />}
        {status === 'success' && (
          <>
            <Box mb={4} pt={4}>
              <Divider mb={4} />
              <NextLink href="/tv/[id]" as={`/tv/${id}`}>
                <Flex justify="flex-start" align="center" color="gray.500">
                  <Icon as={MdArrowBack} boxSize={5} mr={1} />
                  <Text fontSize="xl">Back to main</Text>
                </Flex>
                <Flex align="center">
                  <Heading size="xl">
                    {data.name}
                    <Box ml={2} as="span" color="gray.500" fontWeight={400}>
                      ({dayjs(data.first_air_date).format('YYYY')})
                    </Box>
                  </Heading>
                </Flex>
              </NextLink>
              <Divider mt={4} />
            </Box>
            <Box mb={[4, 8]}>
              <Heading size="xl" textAlign="center">
                {data.number_of_seasons} Seasons
              </Heading>
            </Box>
            <List spacing={4}>
              {data.seasons.map((season) => (
                <ListItem key={season.id}>
                  <Flex align="flex-start">
                    <Box maxWidth={['85px', '150px']} width="100%" borderRadius="6px" overflow="hidden" mr={[4, 8]}>
                      <NextLink href="/tv/[id]/season/[seasonNumber]" as={`/tv/${id}/season/${season.season_number}`}>
                        <AspectRatio ratio={10 / 16}>
                          <Image
                            src={`https://image.tmdb.org/t/p/w342${season.poster_path}`}
                            layout="fill"
                            objectFit="cover"
                          />
                        </AspectRatio>
                      </NextLink>
                    </Box>
                    <Box width="full">
                      <NextLink href="/tv/[id]/season/[seasonNumber]" as={`/tv/${id}/season/${season.season_number}`}>
                        <Flex flexDir={['column', 'row']} align={['flex-start', 'center']} mb={1}>
                          <Flex align="center" mr={2}>
                            <Heading lineHeight={0} mr={2}>
                              {season.name}
                            </Heading>
                            <Text fontSize="2xl" color="gray.500">
                              ({dayjs(season.air_date).format('YYYY')})
                            </Text>
                          </Flex>
                          <Flex align="center">
                            <Icon as={MdMovie} boxSize={[5, 6]} mr={2} />
                            <Text fontSize="xl">{season.episode_count} Episodes</Text>
                          </Flex>
                        </Flex>
                      </NextLink>
                      <Text fontSize={['md', 'lg']} color="gray.500" lineHeight="short" mb={2}>
                        Season {season.season_number} of Game of Thrones premiered on{' '}
                        {dayjs(season.air_date).format('DD MMMM YYYY')}.
                      </Text>
                      <Text fontSize={['md', 'xl']} color="gray.500" lineHeight="short">
                        {season.overview}
                      </Text>
                    </Box>
                  </Flex>
                  <Divider mt={4} />
                </ListItem>
              ))}
            </List>
          </>
        )}
      </Container>
    </Layout>
  )
}

export default SeasonsPage
