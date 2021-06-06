import Image from '@/components/Image'
import Layout from '@/components/Layout'
import NextLink from '@/components/NextLink'
import VideoCard from '@/components/VideoCard'
import VideoCardSkeleton from '@/components/VideoCardSkeleton'
import dataGenres from '@/constant/genres.json'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import { MediaType, SortBy } from '@/type/movie'
import { ResponseGeneral } from '@/type/response'
import axiosInstance from '@/utils/axios'
import {
  Alert,
  AlertIcon,
  AspectRatio,
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Select,
  Skeleton,
  Spinner,
  Text,
  VStack,
  Wrap,
  WrapItem
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { IoEllipsisVertical, IoImage, IoStar } from 'react-icons/io5'
import { useInfiniteQuery } from 'react-query'

type MediaTypeExcludePerson = Exclude<MediaType, 'person'>

async function fetchData({
  pageParam = 1,
  id,
  mediaType,
  sortBy
}: {
  pageParam: number
  id: string
  mediaType: MediaTypeExcludePerson | ''
  sortBy: SortBy
}) {
  const { data } = await axiosInstance.get<ResponseGeneral>(
    `/discover/${mediaType}?sort_by=${sortBy}.desc&with_genres=${id}&page=${pageParam}`
  )
  return data
}

const GenreMovieDetailPage = () => {
  const router = useRouter()
  const [mediaType, setMediaType] = useState<MediaTypeExcludePerson>()
  const [genre, setGenre] = useState<{ id: string; name: string }>()
  const [sortBy, setSortBy] = useState<SortBy>('popularity')

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery<ResponseGeneral>(
    ['genres', mediaType, genre?.id, sortBy],
    ({ pageParam = 1 }) => fetchData({ id: genre?.id, pageParam, sortBy, mediaType }),
    {
      enabled: Boolean(mediaType) && Boolean(genre?.id),
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage) => (lastPage.page !== lastPage.total_pages ? lastPage.page + 1 : false),
      keepPreviousData: false
    }
  )
  const loadMoreButtonRef = React.useRef<HTMLButtonElement>()

  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage
  })

  useEffect(() => {
    if (router.isReady) {
      const [id, genre] = (router.query.id as string)?.split('-')
      setGenre({ id, name: genre })
      setMediaType(router.query.mediaType as MediaTypeExcludePerson)
    }
  }, [router.query])
  return (
    <Layout>
      <Head>
        <title>
          {status === 'loading' ? 'Loading...' : null}
          {status === 'success' ? `${mediaType === 'movie' ? 'Movie' : 'Tv'}: ${genre?.name}` : null} | Aflix
        </title>
      </Head>
      <Box pt="55px" minHeight="100vh">
        <Center py={[4, 8]} px={4}>
          <Text fontSize="3xl">Explore thousands of shows and movies from around the world.</Text>
        </Center>
        <Flex
          bg="gray.900"
          px="5%"
          justify="space-between"
          align={['flex-start', 'center']}
          flexDir={['column', 'row']}
          py={4}
        >
          <Box w="full" mb={[2, 0]} flex="1 1 0%" display="flex">
            {status === 'loading' && <Skeleton borderRadius="md" h={6} width={['40vw', '10vw']} />}
            {status === 'success' && (
              <>
                <Text textAlign={['center', 'left']} fontSize="lg" mr={1}>
                  {mediaType === 'movie' ? 'Movie' : 'Tv Show'}:
                </Text>
                <Text fontWeight="bold" textAlign={['center', 'left']} fontSize="lg" color="white">
                  {genre?.name}
                </Text>
              </>
            )}
          </Box>

          {status === 'loading' && <Skeleton borderRadius="md" h={6} width={['40vw', '10vw']} />}
          {status === 'success' && (
            <FormControl display="flex" id="sortBy" alignItems="center" w="auto">
              <FormLabel mb={0}>Sort by</FormLabel>
              <Select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortBy)} w="auto">
                <option value="popularity">Popularity</option>
                <option value="release_date">Release date</option>
                <option value="revenue">Revenue</option>
                <option value="original_title">Title</option>
                <option value="vote_average">Vote average</option>
                <option value="vote_count">Vote count</option>
              </Select>
            </FormControl>
          )}
        </Flex>
        <Box mx="5%" py={8}>
          {status === 'loading' && (
            <Grid gridTemplateColumns={['repeat(2, 1fr)', 'repeat(4, 1fr)']} gap={4}>
              {Array.from({ length: 8 }, (_, i) => (
                <VideoCardSkeleton key={i} />
              ))}
            </Grid>
          )}
          {status === 'error' && (
            <Alert status="warning">
              <AlertIcon />
              Ops.. something wrong! Please refresh this page.
            </Alert>
          )}
          {status === 'success' &&
            data.pages.map((group, i) => (
              <React.Fragment key={i}>
                {group.results.length > 0 ? (
                  <Grid gridTemplateColumns={['repeat(2, 1fr)', 'repeat(4, 1fr)']} gap={4}>
                    {group.results.map((video) => {
                      const genres = dataGenres[mediaType === 'movie' ? 'movies' : 'tv'].filter((genre) =>
                        video.genre_ids.includes(genre.id)
                      )
                      return (
                        <VideoCard
                          key={video.id}
                          id={video.id}
                          releaseDate={mediaType === 'movie' ? video.release_date : video.first_air_date}
                          title={mediaType === 'movie' ? video.title : video.original_name}
                          overview={video.overview}
                          voteAverage={video.vote_average}
                          mediaType={mediaType}
                          backdropPath={video.backdrop_path}
                          genres={genres}
                        />
                      )
                    })}
                  </Grid>
                ) : (
                  <Center flexDirection="column">
                    <Text fontSize="lg" fontWeight="bold">
                      We couldn't find results for this genre
                    </Text>
                  </Center>
                )}
              </React.Fragment>
            ))}
          {isFetchingNextPage && (
            <Grid gridTemplateColumns={['repeat(2, 1fr)', 'repeat(4, 1fr)']} gap={4} mt={4}>
              {Array.from({ length: 8 }, (_, i) => (
                <VideoCardSkeleton key={i} />
              ))}
            </Grid>
          )}
          <Center mt={8} opacity={hasNextPage ? 1 : 0}>
            <Button
              ref={loadMoreButtonRef}
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Load More' : 'Nothing more to load'}
            </Button>
          </Center>
        </Box>
      </Box>
    </Layout>
  )
}

export default GenreMovieDetailPage
