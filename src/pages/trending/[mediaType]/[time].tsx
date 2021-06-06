import CollectionView from '@/components/CollectionView'
import Layout from '@/components/Layout'
import { Box, Button, chakra, Heading, Popover, PopoverBody, PopoverContent, PopoverTrigger } from '@chakra-ui/react'
import { fetchTrendingUrl } from '@/constant/index'
import { NextPage } from 'next'
import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { MediaType } from '@/type/movie'
import Error from '@/components/Error'

const TrendingThisWeekPage: NextPage = () => {
  const router = useRouter()
  const [selectedMediaType, setSelectedMediaType] = useState<'movie' | 'tv'>()
  const [selectedTime, setSelectedTime] = useState<'week' | 'day'>()
  const [isPageError, setIsPageError] = useState(false)
  useEffect(() => {
    if (router.isReady) {
      const { mediaType, time } = router.query
      if ((mediaType !== 'tv' && mediaType !== 'movie') || (time !== 'week' && time !== 'day')) {
        setIsPageError(true)
      } else {
        setSelectedMediaType(mediaType as 'movie' | 'tv')
        setSelectedTime(time as 'week' | 'day')
      }
    }
  }, [router])
  return (
    <Layout>
      <Head>
        <title>Trending {selectedMediaType} | Aflix</title>
      </Head>
      <Box mx={'5%'} mt={12} py={['55px']}>
        {isPageError ? (
          <Error message={'404'} description={'Page not found'} />
        ) : (
          <>
            {selectedTime && selectedMediaType && (
              <>
                <Heading size="lg" mb={4}>
                  Trending{' '}
                  <Popover trigger="hover">
                    <PopoverTrigger>
                      <chakra.span color="blue.500">
                        {selectedMediaType === 'movie' ? 'Movies' : 'TV Shows'}
                      </chakra.span>
                    </PopoverTrigger>
                    <PopoverContent w="auto">
                      <PopoverBody>
                        <Button
                          onClick={() =>
                            router.push(`/trending/${selectedMediaType === 'movie' ? 'tv' : 'movie'}/${selectedTime}`)
                          }
                          variant="ghost"
                          colorScheme="blue"
                          fontSize="inherit"
                        >
                          {selectedMediaType === 'movie' ? 'TV Shows' : 'Movies'}
                        </Button>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                  {' in '}
                  <Popover trigger="hover">
                    <PopoverTrigger>
                      <chakra.span color="blue.500">
                        {selectedTime === 'day' ? 'today' : selectedTime === 'week' ? 'this week' : null}
                      </chakra.span>
                    </PopoverTrigger>
                    <PopoverContent w="auto">
                      <PopoverBody>
                        <Button
                          onClick={() =>
                            router.push(`/trending/${selectedMediaType}/${selectedTime === 'week' ? 'day' : 'week'}`)
                          }
                          variant="ghost"
                          colorScheme="blue"
                          fontSize="inherit"
                        >
                          {selectedTime === 'week' ? 'Today' : 'this Week'}
                        </Button>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </Heading>
                <CollectionView
                  queryKey={`trending-${selectedMediaType}-${selectedTime}`}
                  url={`/trending/${selectedMediaType}/${selectedTime}`}
                />
              </>
            )}
          </>
        )}
      </Box>
    </Layout>
  )
}

export default TrendingThisWeekPage
