import Image from '@/components/Image'
import NextLink from '@/components/NextLink'
import { MediaType } from '@/type/movie'
import {
  AspectRatio,
  Box,
  Flex,
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
  Text,
  Wrap,
  WrapItem
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import React, { FC } from 'react'
import { IoEllipsisVertical, IoImage, IoStar } from 'react-icons/io5'

const VideoCard: FC<{
  mediaType: Exclude<MediaType, 'person'>
  id: number
  backdropPath: string
  title: string
  voteAverage: number
  overview: string
  releaseDate: string
  genres: Array<{ id: number; name: string }>
}> = ({ mediaType, id, backdropPath, title, voteAverage, overview, genres, releaseDate }) => {
  return (
    <Popover isLazy placement="right" trigger="hover">
      <PopoverTrigger>
        <Box>
          <AspectRatio ratio={16 / 9} borderRadius="md" overflow="hidden">
            <Box>
              <NextLink href={`/${mediaType}/${id}`} flex="1 1 100%">
                <Image src={`https://image.tmdb.org/t/p/w780${backdropPath}`} layout="fill" objectFit="cover" />
              </NextLink>
            </Box>
          </AspectRatio>
          <Flex align="flex-start" pt={2}>
            <NextLink href={`/${mediaType}/${id}`} flex="1 1 100%">
              <Box>
                <Text lineHeight="shorter" fontWeight="bold" mr={3}>
                  {title}
                </Text>
                <Flex align="center">
                  <Box as="span" aria-label="Release year" color="gray.400">
                    {dayjs(releaseDate).format('YYYY')}
                  </Box>
                  <Box as="span" mx={1} color="gray.400" fontSize="x-small">
                    {'•'}
                  </Box>
                  <Icon as={IoStar} color="yellow.500" mr={1} />
                  <Text fontWeight="bold">{voteAverage.toFixed(1)}</Text>
                </Flex>
              </Box>
            </NextLink>
            <Menu>
              <MenuButton
                as={IconButton}
                w="auto"
                h="auto"
                minW="auto"
                variant="unstyled"
                color="gray.400"
                _hover={{ color: 'white' }}
                _focus={{ ouline: 'none' }}
                aria-label="Options"
                icon={<Icon as={IoEllipsisVertical} />}
              />
              <MenuList>
                <MenuItem>Add to watch list</MenuItem>
                <MenuItem>Detail</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Box>
      </PopoverTrigger>
      <PopoverContent display={['none', 'none', 'block']}>
        <PopoverArrow />
        <PopoverBody>
          <Wrap spacing={1}>
            {genres.map((genre, index) => (
              <WrapItem key={genre.id}>
                <NextLink
                  color="gray.400"
                  href={`/genres/${mediaType}/${genre.id}-${genre.name}`}
                  _hover={{
                    textDecoration: 'underline'
                  }}
                >
                  {genre.name}
                </NextLink>
                {genres.length === index + 1 ? null : (
                  <Box as="span" mr={1}>
                    ,
                  </Box>
                )}
              </WrapItem>
            ))}
          </Wrap>
          <Text noOfLines={6}>{overview}</Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default VideoCard
