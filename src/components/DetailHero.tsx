import { MovieDetail } from '@/type/movie'
import { TvDetail } from '@/type/tv'
import convertDutarionTime from '@/utils/convertDurationTime'
import getUsCertificate from '@/utils/getUsCertificate'
import {
  AspectRatio,
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  Stack,
  Text,
  Tooltip
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import React, { FC, useState } from 'react'
import { IoStar } from 'react-icons/io5'
import { MdAdd, MdFavorite, MdPlayArrow, MdStar } from 'react-icons/md'
import Truncate from 'react-truncate'
import GenresLink from './GenresLink'
import Image from '@/components/Image'

type UnionType = MovieDetail & TvDetail
const DetailHero: FC<{ mediaType: 'tv' | 'movie'; data: any; onPlayTrailer: VoidFunction }> = ({
  data,
  onPlayTrailer,
  mediaType
}) => {
  const [readMore, setReadMore] = useState(false)

  function toggleReadMore() {
    setReadMore((prev) => !prev)
  }
  return (
    <Box height={['full', 'full', '38rem']} position="relative" py={[8, 8, 0]}>
      <Box
        height="full"
        width="full"
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        display={['none', , 'none', 'block']}
        background="linear-gradient(87deg, rgba(26,32,44,1) 0%, rgba(45,55,72,0.8382703423166141) 30%, rgba(74,85,104,0.11278014623818278) 76%, rgba(65,65,65,0) 100%)"
      />
      <Box
        height={['60vh', '60vh', 'full']}
        position="absolute"
        top={0}
        right={0}
        bottom={0}
        backgroundSize="cover"
        width={['100%', '100%', '65%']}
        backgroundImage={[
          `linear-gradient(0deg,rgb(27 33 45) 4%,rgb(32 35 47) 19%,rgb(44 51 64 / 76%) 48%,#4a556838 100%),url(${`https://image.tmdb.org/t/p/w500${data?.backdrop_path}`})`,
          `linear-gradient(0deg,rgb(27 33 45) 4%,rgb(32 35 47) 19%,rgb(44 51 64 / 76%) 48%,#4a556838 100%),url(${`https://image.tmdb.org/t/p/w500${data?.backdrop_path}`})`,
          `linear-gradient(87deg,rgb(40 49 65) 4%,rgb(40 48 64 / 92%) 19%,rgb(44 51 64 / 80%) 48%,#4a556838 100%), url(${`https://image.tmdb.org/t/p/w780${data?.backdrop_path}`})`
        ]}
        background-position="right"
        left="auto"
      />
      <Box
        height={['full']}
        width={['full']}
        position="absolute"
        top={0}
        right={0}
        left={0}
        bottom={0}
        background="linear-gradient(0deg,rgba(26,32,44,1) 0%,rgb(45 55 72 / 14%) 32%,rgb(74 85 104 / 0%) 58%,rgb(65 65 65 / 0%) 100%)"
      />

      <Box margin="0 5%" h="full" display="flex" alignItems="center" flexDirection={['column', 'column', 'row']}>
        <AspectRatio
          ratio={10 / 16}
          zIndex={1}
          w="full"
          maxW={[40, 40, '2xs']}
          overflow="hidden"
          mr={[0, 0, 8]}
          mb={[2, 2, 0]}
          boxShadow="dark-lg"
          borderRadius="6px"
        >
          <Image
            src={`https://image.tmdb.org/t/p/w342${data.poster_path}`}
            alt={mediaType === 'movie' ? data.title || data.original_title : data.name || data.original_name}
            layout="fill"
          />
        </AspectRatio>

        <Stack spacing={[4, 4, 5]} width="full" zIndex={2}>
          {/* Title section */}
          <Heading
            lineHeight="none"
            as="h1"
            size="2xl"
            color="white"
            textAlign={['center', 'center', 'left']}
            maxW="xl"
          >
            {mediaType === 'movie' ? data.title || data.original_title : data.name || data.original_name}
            <Flex display="inline-flex" as="span" ml={4} align="center" justify="center">
              <Icon aria-label="Rating" as={IoStar} color="yellow.500" boxSize={8} />
              <Text ml={[1, 2]} display="inline" color="white" fontSize="3xl" fontWeight={400}>
                {data.vote_average}
                <Box ml={1} as="span" mt={[2, 0]} fontSize="sm" color="gray.400">
                  ({data.vote_count})
                </Box>
              </Text>
            </Flex>
          </Heading>
          {/* Rating, gendre ... */}
          <Stack isInline spacing={[0, 0, 4]} alignItems="center" flexDirection={['column', 'column', 'row']}>
            <Text textAlign={['center', 'left']} color="white">
              {dayjs(mediaType === 'movie' ? data?.release_date : data.first_air_date).format('DD MMMM YYYY')}
              {` • `}
              <Badge as="span" mr={1} variant="outline">
                {mediaType === 'movie'
                  ? getUsCertificate(data.release_dates.results) || 'Not Rated'
                  : data.content_ratings.results.find((cr) => cr.iso_3166_1 === 'US').rating || 'Not Rated'}
              </Badge>
              {mediaType === 'movie' ? (
                <>
                  {` • `}
                  {convertDutarionTime(data.runtime)}
                  {` • `}
                </>
              ) : (
                <>
                  {` • `}
                  {data.seasons.length > 0 && `${data.seasons.length} Seasons`}
                  {` • `}
                  {`${data.episode_run_time[0]} Episodes`}
                  {` • `}
                </>
              )}
              <GenresLink genres={data.genres} mediaType={mediaType} />
            </Text>
          </Stack>
          {/* Overview section */}
          <Box maxW="xl">
            <Heading as="h2" size="md" mb={2} color="white">
              Overview
            </Heading>
            <Box>
              <Text color="gray.200">
                <Truncate
                  lines={!readMore && 5}
                  ellipsis={
                    <span>
                      ...{' '}
                      <Button size="sm" onClick={toggleReadMore} variant="link" colorScheme="blue">
                        Read more
                      </Button>
                    </span>
                  }
                >
                  {data.overview}
                </Truncate>
                {readMore && (
                  <Button size="sm" ml={2} onClick={toggleReadMore} variant="link" colorScheme="blue">
                    {' '}
                    Read less
                  </Button>
                )}
              </Text>
            </Box>
          </Box>
          {/* Action button section */}
          <Stack
            direction={['column', 'row']}
            align="center"
            maxW="xl"
            justify={['space-evenly', 'flex-start']}
            mt={[6, 0]}
          >
            <Button isFullWidth size="lg" leftIcon={<MdPlayArrow />} onClick={onPlayTrailer}>
              Play Trailer
            </Button>
            <Button isFullWidth size="lg" leftIcon={<MdAdd />} mr={[2, 4]} onClick={() => {}}>
              Watch List
            </Button>
            <Flex>
              <Tooltip hasArrow aria-label="Mark as favorite" placement="bottom" label="Mark as favorite">
                <IconButton aria-label="Add to my favorite" isRound icon={<MdFavorite />} mr={2} />
              </Tooltip>
              <Tooltip hasArrow aria-label="Rate it" placement="bottom" label="Rate it">
                <IconButton aria-label="Rate this movie" isRound icon={<MdStar />} />
              </Tooltip>
            </Flex>
          </Stack>
        </Stack>
      </Box>
    </Box>
  )
}

export default DetailHero
