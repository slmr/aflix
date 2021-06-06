import Image from '@/components/Image'
import dataGenres from '@/constant/genres.json'
import { AspectRatio, Box, Button, Flex, Heading, Icon, Text, VStack, Wrap, WrapItem } from '@chakra-ui/react'
import Link from 'next/link'
import React, { FC } from 'react'
import { IoAdd, IoPlay, IoStar } from 'react-icons/io5'
import NextLink from './NextLink'

const Banner: FC<{ video: any }> = ({ video }) => {
  const genres = dataGenres.movies.filter((genre) => video.genre_ids.includes(genre.id))
  return (
    <AspectRatio
      ratio={[3 / 2, 3 / 2, 3 / 1]}
      w="full"
      bg="gray.900"
      sx={{
        '::before': {
          pt: ['50px', 0]
        }
      }}
    >
      <Box>
        <NextLink
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          w="full"
          h="full"
          href={`/${video.media_type}/${video.id}`}
          zIndex={2}
        />
        <VStack
          align="flex-start"
          w="full"
          maxW="xl"
          mr={[0, 0, 10]}
          ml={['0', '0', '5%']}
          position={['absolute', 'absolute', 'relative']}
          bottom={0}
          zIndex={[2, 2, 'unset']}
          p={['5vw', '5vw', 0]}
          spacing={3}
        >
          <Box>
            <Heading fontSize={['xl', 'xl', '5xl']}>
              {video?.title}
              <Flex display="inline-flex" as="span" ml={4} align="center" justify="center">
                <Icon aria-label="Rating" as={IoStar} color="yellow.500" boxSize={[4, 8]} />
                <Text ml={[1, 2]} display="inline" color="white" fontSize={['xl', '3xl']} fontWeight={400}>
                  {video.vote_average}
                  <Box ml={1} as="span" mt={[2, 0]} fontSize="sm" color="gray.400">
                    ({video.vote_count})
                  </Box>
                </Text>
              </Flex>
            </Heading>
          </Box>
          <Box>
            <Wrap spacing={1}>
              {genres.map((genre, index) => (
                <WrapItem key={genre.id}>
                  <Text color="gray.300">{genre.name}</Text>
                  {genres.length === index + 1 ? null : (
                    <Box as="span" mr={1}>
                      ,
                    </Box>
                  )}
                </WrapItem>
              ))}
            </Wrap>
          </Box>
          <Box display={['none', 'none', 'block']}>
            <Text fontSize="xl" letterSpacing="taller" noOfLines={3}>
              {video.overview}
            </Text>
          </Box>
          <Box zIndex={3} position="relative" display="flex">
            <Link href={`/${video.media_type}/${video.id}`} passHref>
              <Button isFullWidth as="a" mr={4} size="lg" leftIcon={<Icon boxSize={6} as={IoPlay} />}>
                Detail
              </Button>
            </Link>
            <Button isFullWidth size="lg" leftIcon={<Icon boxSize={6} as={IoAdd} />}>
              Watch List
            </Button>
          </Box>
        </VStack>
        <Box
          w="full"
          h={['calc(100% - 75px)', 'calc(100% - 75px)', 'full']}
          position={['absolute', 'absolute', 'relative']}
          top={0}
        >
          <Box
            position="absolute"
            top={0}
            bottom={0}
            left={0}
            w={['full', 'full', '200px']}
            h="full"
            zIndex={1}
            bg={[
              'linear-gradient(to top, var(--chakra-colors-gray-900), rgba(0,0,0,0))',
              'linear-gradient(to top, var(--chakra-colors-gray-900), rgba(0,0,0,0))',
              'linear-gradient(to right, var(--chakra-colors-gray-900), rgba(0,0,0,0))'
            ]}
          />
          <Image
            layout="fill"
            alt={video.title || video.original_title || video.season_name}
            src={`https://image.tmdb.org/t/p/w780${video.backdrop_path}`}
            objectFit="cover"
          />
        </Box>
      </Box>
    </AspectRatio>
  )
}

export default Banner
