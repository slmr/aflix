import { Episode as EpisodeType } from '@/type/tv-season'
import { AspectRatio, Box, Flex, Heading, Icon, Text, Collapse, Button } from '@chakra-ui/react'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { IoChevronUp, IoChevronDown, IoStar, IoImage } from 'react-icons/io5'
import Truncate from 'react-truncate'
import Image from '@/components/Image'

const Episode: React.FC<{ episode: EpisodeType }> = ({ episode }) => {
  const [readMore, setReadMore] = useState(false)

  const toggleReadMore = () => setReadMore(!readMore)

  return (
    <Box
      w="full"
      bg={['transparent', 'gray.900']}
      borderRadius="6px"
      overflow="hidden"
      alignSelf="flex-start"
      boxShadow="dark-md"
    >
      <Box display={['flex', 'block']}>
        <AspectRatio ratio={16 / 9} w={['70%', 'full']} h="full" borderRadius="6px" overflow="hidden">
          <Box>
            <Image
              src={`https://image.tmdb.org/t/p/w342${episode.still_path}`}
              layout="fill"
              objectFit="cover"
            />
            <Box position="absolute" backgroundColor="rgba(0,0,0,.2)" top={0} left={0} right={0} bottom={0} />
            <Box
              position="absolute"
              bottom={['10px', '12px']}
              left="10px"
              padding="0"
              backgroundColor="transparent"
              fontSize={['25px', '44px']}
              fontWeight={600}
              color="#fff"
              textShadow="0 2px 12px rgba(0,0,0,.4)"
              zIndex={2}
              lineHeight={1}
            >
              {episode.episode_number}
            </Box>
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              background="linear-gradient(45deg,transparent 50%,rgba(0,0,0,.03) 52%,rgba(0,0,0,.74))"
              zIndex={2}
            >
              <Flex pos="absolute" right="8px" top="8px" width="auto" justify="center" align="center">
                <Text mr={1}>{episode.vote_average.toFixed(1)}</Text>
                <Icon aria-label="Rating" as={IoStar} color="yellow.500" boxSize={5} />
              </Flex>
            </Box>
          </Box>
        </AspectRatio>
        <Box px={4} py={[0, 4]} w="full">
          <Heading size="sm" fontWeight={500} lineHeight={1} mb={2}>
            {episode.name} - Episode {episode.episode_number}
          </Heading>
          <Text fontSize="sm" lineHeight="shorter" color="gray.400" mb={[0, 2]}>
            {dayjs(episode.air_date).format('MMMM DD, YYYY')}
          </Text>
          <Text fontSize="md" lineHeight="shorter" color="gray.400" display={['none', 'inline-block']}>
            <Truncate
              lines={!readMore && 4}
              ellipsis={
                <span>
                  ...{' '}
                  <Button size="sm" onClick={toggleReadMore} variant="link" colorScheme="blue">
                    Read more
                  </Button>
                </span>
              }
            >
              {episode.overview}
            </Truncate>
            {readMore && (
              <Button size="sm" ml={2} onClick={toggleReadMore} variant="link" colorScheme="blue">
                {' '}
                Read less
              </Button>
            )}
          </Text>
        </Box>
        <Box display={['block', 'none']}>
          <Icon
            as={readMore ? IoChevronUp : IoChevronDown}
            mt={-2}
            boxSize={5}
            color="gray.400"
            onClick={toggleReadMore}
          />
        </Box>
      </Box>
      <Box display={['block', 'none']}>
        <Collapse in={readMore}>
          <Text fontSize="md" lineHeight="shorter" color="gray.400" mt={2}>
            {episode.overview}
          </Text>
        </Collapse>
      </Box>
    </Box>
  )
}

export default Episode
