import { AspectRatio, Box, Flex, Grid, GridItem, Icon, Text } from '@chakra-ui/react'
import dayjs from 'dayjs'
import React from 'react'
import { IoImage } from 'react-icons/io5'
import { Season } from '../type/tv'
import Image from '@/components/Image'
import NextLink from './NextLink'
import Caraousel from './Slider'
import VideoThumbnail from './VideoThumbnail'

interface SeasonListProps {
  seasons?: Season[]
  tvId: number | string
}

const SeasonList: React.FC<SeasonListProps> = ({ seasons, tvId }) => {
  return (
    seasons?.length > 0 && (
      <Grid
        templateColumns={['1fr', '1fr', 'repeat(4, 1fr)']}
        gap={[4, 4, 4]}
        overflowX={['scroll', 'scroll', 'auto']}
        pb={4}
        width={['calc(100% + 10vw)', 'calc(100% + 10vw)', '100%']}
        ml={['-5vw', '-5vw', 0]}
        pl={['5vw', '5vw', 0]}
      >
        {seasons.map((season) => (
          <GridItem
            gridRow={[1, 'auto']}
            cursor="pointer"
            key={season.id}
            bg="gray.700"
            boxShadow="dark-md"
            transition="all 300ms ease-in"
            sx={{
              ':hover': { boxShadow: 'dark-lg', '.overlay': { opacity: 1 } }
            }}
            p={2}
            borderRadius="md"
          >
            <NextLink href={`/tv/${tvId}/seasons/${season.season_number}`}>
              <AspectRatio ratio={2 / 3} position="relative" borderRadius="md" overflow="hidden" minW="120px">
                <Box>
                  <Image
                    src={`https://image.tmdb.org/t/p/w342${season.poster_path}`}
                    layout="fill"
                    objectFit="cover"
                  />
                  <Box
                    className="overlay"
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    opacity={0}
                    transition="opacity 300ms ease-in"
                    background="linear-gradient(0deg, rgb(0 0 0 / 49%) 0%, rgb(0 0 0 / 20%) 52%)"
                  />
                </Box>
              </AspectRatio>
              <Box pt={2}>
                <Text fontSize="lg" color="gray.200">Season {season.season_number}</Text>
                <Text fontSize="sm" color="gray.300">
                  {season.episode_count} Episodes
                </Text>
                <Text fontSize="sm" color="gray.300">
                  {dayjs(season.air_date).format('DD MMMM YYYY')}
                </Text>
              </Box>
            </NextLink>
          </GridItem>
        ))}
      </Grid>
    )
  )
}

export default SeasonList
