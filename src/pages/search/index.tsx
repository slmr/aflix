import Layout from '@/components/Layout'
import Loading from '@/components/Loading'
import NextLink from '@/components/NextLink'
import SearchInput from '@/components/SearchInput'
import VideoListRow from '@/components/VideoListRow'
import { SearchType } from '@/type/movie'
import { AspectRatio, Box, Button, Center, Flex, List, ListItem, Skeleton, Stack, Text, VStack } from '@chakra-ui/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useInfiniteQuery, useQuery } from 'react-query'
import { fetchSearcUrl, fetchTrendingUrl } from '../../constant'
import { ResponseGeneral } from '../../type/response'
import axiosInstance from '../../utils/axios'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'

async function fetchSearch({ pageParam = 1, query, type }: { pageParam?: number; query: string; type: SearchType }) {
  const { data } = await axiosInstance.get<ResponseGeneral>(`${fetchSearcUrl(type, query)}&page=${pageParam}`)
  return data
}

const linkStyle = (isActive: boolean) => {
  return {
    display: 'inline-flex',
    position: 'relative',
    textTransform: 'uppercase',
    color: isActive ? 'white' : 'gray.400',
    letterSpacing: 'wide',
    py: [4, 5],
    fontSize: 'lg',
    transition: 'all 150ms ease-in',
    ':hover': {
      color: 'white'
    },
    '::after': {
      content: "''",
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      bg: isActive ? 'blue.500' : 'transparent',
      h: ['1.5px', '1px'],
      w: 'full'
    }
  }
}
const SearchPage: React.FC = () => {
  const router = useRouter()
  const [value, setValue] = useState('')
  const [type, setType] = useState<SearchType>('multi')
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery<ResponseGeneral>(
    ['search', value, type],
    ({ pageParam = 1 }) => fetchSearch({ query: value, type, pageParam }),
    {
      enabled: Boolean(value),
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage) => (lastPage.page !== lastPage.total_pages ? lastPage.page + 1 : false),
      keepPreviousData: true
    }
  )
  const loadMoreButtonRef = React.useRef<HTMLButtonElement>()

  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage
  })
  useEffect(() => {
    setValue(router?.query?.query as string)
    setType((router?.query?.type as SearchType) ?? 'multi')
  }, [router])

  return (
    <Layout>
      <Head>
        <title>Search | Aflix</title>
      </Head>
      <Box pt={['55px']} minHeight="100vh" pb={8}>
        {/* Search Form */}
        <Box px={[4, 10]} py={[4, 8]} bg="gray.900">
          <Box mx="auto" maxW="3xl">
            <SearchInput
              initialValue={value}
              onSubmit={(queryValue) => {
                setValue(queryValue)
                router.push(`/search?query=${queryValue}`, undefined)
              }}
            />
          </Box>
        </Box>
        <Box bg="#1A202CEB" mx="auto" maxW="3xl" position="sticky" top="55px" zIndex={10}>
          {data?.pages[0].results?.length > 0 && (
            <Stack direction="row" as={List} spacing={'16'} align="center" justify="center">
              <ListItem>
                <NextLink sx={{ ...linkStyle(type === 'multi') }} href={`/search?query=${value}`}>
                  All
                </NextLink>
              </ListItem>
              <ListItem>
                <NextLink sx={{ ...linkStyle(type === 'movie') }} href={`/search?query=${value}&type=movie`}>
                  Movies
                </NextLink>
              </ListItem>
              <ListItem>
                <NextLink sx={{ ...linkStyle(type === 'tv') }} href={`/search?query=${value}&type=tv`}>
                  TV
                </NextLink>
              </ListItem>
            </Stack>
          )}
        </Box>
        <Box bg="gray.900" m="0 auto" p={[4, 8]} h="full" minHeight="100vh">
          {status === 'loading' && <Loading mt={8} />}
          {status === 'success' &&
            data.pages.map((group, i) => (
              <React.Fragment key={i}>
                {group.results.length > 0 ? (
                  <Box maxWidth={['full', '3xl']} m="0 auto">
                    <VideoListRow
                      videos={group.results}
                      mediaType={type === 'movie' ? 'movie' : type === 'tv' ? 'tv' : undefined}
                    />
                  </Box>
                ) : (
                  <Center flexDirection="column">
                    <Text fontSize="lg" fontWeight="bold">
                      We couldn't find results for "{value}"
                    </Text>
                    <Text color="gray.300">Try a different search term.</Text>
                  </Center>
                )}
              </React.Fragment>
            ))}
          {isFetchingNextPage && (
            <VStack spacing={[4, 8]} maxWidth={['full', '3xl']} my={8} mx="auto">
              {Array.from({ length: 4 }, (_, i) => (
                <Flex key={i} w="full">
                  <AspectRatio ratio={16 / 9} borderRadius="lg" w="full" overflow="hidden">
                    <Skeleton h="full" w="full" />
                  </AspectRatio>
                  <VStack align="flex-start" spacing={2} w="full" ml={6}>
                    <Skeleton borderRadius="md" h="20px" w="80%" />
                    <Skeleton borderRadius="md" h="20px" w="60%" />
                    <Skeleton borderRadius="md" h="20px" w="50%" />
                  </VStack>
                </Flex>
              ))}
            </VStack>
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

export default SearchPage
