import Error from '@/components/Error'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import { MediaType } from '@/type/movie'
import { ResponseGeneral } from '@/type/response'
import axios from '@/utils/axios'
import { Box, Button, Center, Grid, GridItem } from '@chakra-ui/react'
import React, { FC } from 'react'
import { useInfiniteQuery } from 'react-query'
import VideoCard from './VideoCard'
import VideoCardSkeleton from './VideoCardSkeleton'
import dataGenres from '@/constant/genres.json'
import getGenresFromIds from '@/utils/getGenresFromIds'

async function fetchData({ pageParam = 1, url }) {
  const { data } = await axios.get<ResponseGeneral>(`${url}?page=${pageParam}`)
  return data
}

const CollectionView: FC<{ queryKey: string | string[]; url: string; mediaType?: Exclude<MediaType, 'person'> }> = ({
  queryKey,
  url,
  mediaType
}) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery<ResponseGeneral>(
    queryKey,
    ({ pageParam }) => fetchData({ pageParam, url }),
    {
      refetchOnWindowFocus: false,
      enabled: Boolean(url),
      getNextPageParam: (lastPage) => (lastPage.page !== lastPage.total_pages ? lastPage.page + 1 : false)
    }
  )

  const loadMoreButtonRef = React.useRef<HTMLButtonElement>()

  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage
  })
  return (
    <Box>
      <Grid gridTemplateColumns={['repeat(2, 1fr)', 'repeat(4, 1fr)']} gap={4}>
        {status === 'loading' && (
          <React.Fragment>
            {Array.from({ length: 8 }, (_, i) => (
              <VideoCardSkeleton key={i} />
            ))}
          </React.Fragment>
        )}
        {status === 'error' && <Error />}
        {status === 'success' &&
          data.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.results.map((video, i) => {
                const genres = getGenresFromIds(
                  video.genre_ids,
                  mediaType || (video?.media_type as Exclude<MediaType, 'person'>)
                )
                return (
                  <VideoCard
                    key={video.id}
                    id={video.id}
                    releaseDate={mediaType === 'movie' ? video.release_date : video.first_air_date}
                    title={video.title || video.name || video.original_title}
                    overview={video.overview}
                    voteAverage={video.vote_average}
                    mediaType={mediaType || video.media_type as 'movie' | 'tv'}
                    backdropPath={video.backdrop_path}
                    genres={genres}
                  />
                )
              })}
            </React.Fragment>
          ))}
        {isFetchingNextPage && (
          <>
            {Array.from({ length: 8 }, (_, i) => (
              <VideoCardSkeleton key={i} />
            ))}
          </>
        )}
      </Grid>
      <Center mt={8} opacity={hasNextPage ? 1 : 0}>
        <Button ref={loadMoreButtonRef} onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
          {isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Load More' : 'Nothing more to load'}
        </Button>
      </Center>
    </Box>
  )
}

export default CollectionView
