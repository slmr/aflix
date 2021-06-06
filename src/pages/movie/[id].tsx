import CastList from '@/components/CastList'
import DetailHero from '@/components/DetailHero'
import GenresLink from '@/components/GenresLink'
import Keywords from '@/components/Keywords'
import Layout from '@/components/Layout'
import Loading from '@/components/Loading'
import MediaSection from '@/components/MediaSection'
import ModalVideo from '@/components/ModalVideo'
import Reviews from '@/components/Reviews'
import VideoList from '@/components/VideoList'
import useGetDetailVideo from '@/hooks/useGetDetailVideo'
import { MovieDetail } from '@/type/movie'
import convertDutarionTime from '@/utils/convertDurationTime'
import getJob from '@/utils/getCrewJob'
import {
  Box,
  Center,
  chakra,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure,
  VStack,
  Wrap,
  WrapItem
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import { FaFacebookSquare, FaImdb, FaInstagramSquare, FaTwitterSquare } from 'react-icons/fa'
import { IoPlay } from 'react-icons/io5'
import { MdLink } from 'react-icons/md'
import NumberFormat from 'react-number-format'
import { fetchRecommendationsUrl, fetchSimilarUrl } from '../../constant'

const MovieDetailPage: NextPage = () => {
  const { isOpen: isOpenTrailer, onOpen: onOpenTrailer, onClose: onCloseTrailer } = useDisclosure()
  const router = useRouter()
  const { data, status } = useGetDetailVideo<MovieDetail>(router.query.id as string, 'movie')
  return (
    <Layout>
      <Head>
        <title>
          {status === 'success'
            ? `${data?.title} (${dayjs(data?.release_date).format('YYYY')})`
            : status === 'error'
            ? 'Error'
            : 'Loading...'}{' '}
          | Aflix
        </title>
      </Head>
      <Box mt={['55px']} minHeight="100vh">
        {status === 'loading' && (
          <Center h="100vh">
            <Loading />
          </Center>
        )}
        {status === 'error' && <h1>Error</h1>}
        {status === 'success' && (
          <>
            <DetailHero mediaType="movie" data={data} onPlayTrailer={onOpenTrailer} />

            <Box margin="0 5vw">
              <Box display="flex" flexDirection={['column-reverse', 'column-reverse', 'row']}>
                <VStack w={['full', 'full', '70%']} spacing={10} mr={[0, 0, 10]} alignItems="flex-start">
                  {/* More details */}
                  <Box w="full">
                    <Box mb={4} display="flex" alignItems="center">
                      <Icon as={IoPlay} mr={2} color="blue.500" boxSize={6} />
                      <Heading size="lg">More Details</Heading>
                    </Box>
                    <SimpleGrid columns={[1, 1, 2, 3]} spacing={[4, 4, 12]}>
                      <Stack spacing={[2, 4]} width="full">
                        <Box>
                          <Heading size="sm">Genre</Heading>
                          <GenresLink genres={data?.genres} mediaType="movie" />
                        </Box>
                        <Box>
                          <Heading size="sm">Runtime</Heading>
                          <Text>{convertDutarionTime(data.runtime)}</Text>
                        </Box>
                        <Box>
                          <Heading size="sm">Director</Heading>
                          <Text>
                            {getJob(data.credits.crew).director.map((crew, index, array) =>
                              array.length === index + 1 ? `${crew.name}` : `${crew.name}, `
                            )}
                          </Text>
                        </Box>
                        {getJob(data.credits.crew).producer.length > 0 && (
                          <Box>
                            <Heading size="sm">Producer</Heading>
                            <Text>
                              {getJob(data.credits.crew).producer.map((crew, index, array) =>
                                array.length === index + 1 ? `${crew.name}` : `${crew.name}, `
                              )}
                            </Text>
                          </Box>
                        )}

                        {getJob(data.credits.crew).screenplay.length > 0 && (
                          <Box>
                            <Heading size="sm">Screenplay</Heading>
                            <Text>
                              {getJob(data.credits.crew).screenplay.map((crew, index, array) =>
                                array.length === index + 1 ? `${crew.name}` : `${crew.name}, `
                              )}
                            </Text>
                          </Box>
                        )}
                        {data.production_companies.length > 0 && (
                          <Box>
                            <Heading size="sm">Production Co</Heading>
                            <Text>
                              {data.production_companies.map((pc, index, array) =>
                                array.length === index + 1 ? `${pc.name}` : `${pc.name}, `
                              )}
                            </Text>
                          </Box>
                        )}
                      </Stack>
                      <Stack spacing={[2, 4]} width="full">
                        <Box>
                          <Heading size="sm">Status</Heading>
                          <Text>{data.status}</Text>
                        </Box>
                        <Box>
                          <Heading size="sm">Language</Heading>
                          <Text>
                            {data.spoken_languages.map((language, index, array) =>
                              array.length === index + 1 ? `${language.name}` : `${language.name}, `
                            )}
                          </Text>
                        </Box>
                        <Box>
                          <Heading size="sm">Release date</Heading>
                          <Text>{dayjs(data?.release_date).format('DD MMMM YYYY')}</Text>
                        </Box>

                        <Box>
                          <Heading size="sm">Budget</Heading>
                          <Text>
                            {data.budget === 0 ? (
                              '-'
                            ) : (
                              <NumberFormat
                                value={data.budget}
                                displayType="text"
                                thousandSeparator
                                prefix="$"
                                renderText={(value) => value}
                              />
                            )}
                          </Text>
                        </Box>
                        <Box>
                          <Heading size="sm">Revenue</Heading>
                          <Text>
                            {data.revenue === 0 ? (
                              '-'
                            ) : (
                              <NumberFormat
                                value={data.revenue}
                                displayType="text"
                                thousandSeparator
                                prefix="$"
                                renderText={(value) => value}
                              />
                            )}
                          </Text>
                        </Box>
                      </Stack>
                      <Stack spacing={[2, 4]} width="full">
                        <Box>
                          <Heading size="sm" mb={2}>
                            Keywords
                          </Heading>
                          <Keywords keywords={data.keywords.keywords} />
                        </Box>
                        <Box>
                          <Heading size="sm" mb={2}>
                            External link
                          </Heading>
                          <Wrap>
                            <WrapItem>
                              <chakra.a
                                href={data.homepage}
                                target="_blank"
                                rel="noreferrer"
                                p={2}
                                aria-label="External link homepage"
                                borderRadius="md"
                                transition="background 300ms ease-in-out"
                                sx={{
                                  ':hover': {
                                    bg: 'gray.700'
                                  }
                                }}
                              >
                                <Icon as={MdLink} boxSize={7} />
                              </chakra.a>
                            </WrapItem>
                            <WrapItem>
                              <chakra.a
                                href={`https://www.imdb.com/title/${data?.external_ids?.imdb_id}`}
                                target="_blank"
                                rel="noreferrer"
                                p={2}
                                aria-label="External link imdb"
                                borderRadius="md"
                                transition="background 300ms ease-in-out"
                                sx={{
                                  ':hover': {
                                    bg: 'gray.700'
                                  }
                                }}
                              >
                                <Icon as={FaImdb} boxSize={7} />
                              </chakra.a>
                            </WrapItem>
                            <WrapItem>
                              <chakra.a
                                href={`https://www.facebook.com/${data?.external_ids?.facebook_id}`}
                                target="_blank"
                                rel="noreferrer"
                                p={2}
                                aria-label="External link facebook"
                                borderRadius="md"
                                transition="background 300ms ease-in-out"
                                sx={{
                                  ':hover': {
                                    bg: 'gray.700'
                                  }
                                }}
                              >
                                <Icon as={FaFacebookSquare} boxSize={7} />
                              </chakra.a>
                            </WrapItem>
                            <WrapItem>
                              <chakra.a
                                href={`https://www.instagram.com/${data?.external_ids?.instagram_id}`}
                                target="_blank"
                                rel="noreferrer"
                                aria-label="External link instagram"
                                p={2}
                                borderRadius="md"
                                transition="background 300ms ease-in-out"
                                sx={{
                                  ':hover': {
                                    bg: 'gray.700'
                                  }
                                }}
                              >
                                <Icon as={FaInstagramSquare} boxSize={7} />
                              </chakra.a>
                            </WrapItem>
                            <WrapItem>
                              <chakra.a
                                href={`https://www.twitter.com/${data?.external_ids?.twitter_id}`}
                                target="_blank"
                                rel="noreferrer"
                                aria-label="External link twitter"
                                p={2}
                                borderRadius="md"
                                transition="background 300ms ease-in-out"
                                sx={{
                                  ':hover': {
                                    bg: 'gray.700'
                                  }
                                }}
                              >
                                <Icon as={FaTwitterSquare} boxSize={7} />
                              </chakra.a>
                            </WrapItem>
                          </Wrap>
                        </Box>
                      </Stack>
                    </SimpleGrid>
                  </Box>

                  {/* Media Section */}
                  <Box w="full">
                    <Box mb={4} display="flex" alignItems="center">
                      <Icon as={IoPlay} mr={2} color="blue.500" boxSize={6} />
                      <Heading size="lg">Trailers & Clips</Heading>
                    </Box>
                    <MediaSection videos={data.videos.results} />
                  </Box>

                  {/* Reviews Section */}
                  <Box w="full">
                    <Box mb={4} display="flex" alignItems="center">
                      <Icon as={IoPlay} mr={2} color="blue.500" boxSize={6} />
                      <Heading size="lg">Reviews</Heading>
                    </Box>
                    <Reviews id={data.id} mediaType="movie" title={data.title || data.original_title} />
                  </Box>
                </VStack>
                {/* Cast */}
                <Box w={['full', 'full', '30%']} mb={[10, 10, 0]}>
                  <Flex justify="space-between" align="center" mb={4}>
                    <Box display="flex" alignItems="center">
                      <Icon as={IoPlay} mr={2} color="blue.500" boxSize={6} />
                      <Heading size="lg">Cast</Heading>
                    </Box>
                  </Flex>
                  <CastList movieId={data.id} casts={data.credits.cast} />
                </Box>
              </Box>
            </Box>
            <Box className="container-video-list" overflow="hidden" pb={[12, 24]} pt={12}>
              {/* More like this */}
              <Box mb={[6]} mx="5vw">
                <VideoList
                  mediaType="movie"
                  title="Similar Movie"
                  fetchKey="similar"
                  fetchUrl={fetchSimilarUrl('movie', data?.id)}
                />
              </Box>

              {/* You May Also Like */}
              <Box mb={[6]} mt={[2, 12]} mx="5vw">
                <VideoList
                  mediaType="movie"
                  title="You May Also Like"
                  fetchKey="recommendations"
                  fetchUrl={fetchRecommendationsUrl('movie', data.id)}
                />
              </Box>
            </Box>
            {/* Modal Play trailer */}
            <ModalVideo
              isOpen={isOpenTrailer}
              onClose={onCloseTrailer}
              isCentered
              closeOnOverlayClick={false}
              size="4xl"
              video={data.videos.results[0]}
            />
          </>
        )}
      </Box>
    </Layout>
  )
}

export default MovieDetailPage
