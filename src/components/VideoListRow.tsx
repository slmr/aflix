import {
  AspectRatio,
  Box,
  Button,
  Collapse,
  Flex,
  Heading,
  Icon,
  IconButton,
  List,
  ListItem,
  Text
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { IoArrowForward, IoStar, IoImageOutline } from 'react-icons/io5'
import { MediaType } from '../type/movie'
import { ResponseGeneralResults } from '../type/response'
import Image from '@/components/Image'
import NextLink from './NextLink'

const VidoeRow = ({ video, mediaType }) => {
  const [readMore, setReadMore] = useState(false)
  return (
    <Flex>
      <Box width={['45%', 'full']} height="full">
        <NextLink
          href={`/${`${video?.media_type || mediaType}`}/[id]`}
          as={`/${`${video?.media_type || mediaType}`}/${video.id}`}
        >
          <AspectRatio ratio={16 / 9}>
            <Box borderRadius="12px" overflow="hidden" bg="blackAlpha.600">
              <Image
                src={`https://image.tmdb.org/t/p/w342${video.backdrop_path}`}
                layout="fill"
                objectFit="cover"
              />
              <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                background="linear-gradient(45deg,transparent 50%,rgba(0,0,0,.03) 52%,rgba(0,0,0,.74))"
                transition="all .3s ease"
              >
                <Flex pos="absolute" right="8px" top="8px" width="auto" justify="center" align="center">
                  <Text fontSize={['md', 'lg']} mr={[1, 2]}>
                    {video.vote_average}
                  </Text>
                  <Icon aria-label="Rating" as={IoStar} color="yellow.500" boxSize={[4, 6]} />
                </Flex>
              </Box>
              <Box
                position="absolute"
                height="full"
                width="full"
                top={0}
                left={0}
                right={0}
                bottom={0}
                borderRadius="12px"
                overflow="hidden"
                transition="all .3s ease"
                opacity={0}
                _hover={{
                  background: 'linear-gradient(180deg,rgba(0,0,0,.17) 0,rgba(0,0,0,.72))',
                  opacity: 1
                }}
              >
                <IconButton
                  position="absolute"
                  top="50%"
                  left="50%"
                  borderRadius="full"
                  transform="translate(-50%, -50%)"
                  aria-label="go to detail"
                  icon={<IoArrowForward />}
                  size="lg"
                  fontSize="2rem"
                />
              </Box>
            </Box>
          </AspectRatio>
        </NextLink>
      </Box>
      <Flex flexDir="column" width={['55%', 'full']} px={[3, 6]}>
        <NextLink
          href={`/${`${video?.media_type || mediaType}`}/[id]`}
          as={`/${`${video?.media_type || mediaType}`}/${video.id}`}
          passHref
        >
          <Heading fontSize={['xl', '3xl']} lineHeight="shorter">
            {video.title || video.original_name || video.original_title}
          </Heading>
          <Text fontSize={['sm', 'xl']} color="gray.500">
            {dayjs(video?.release_date).format('DD MMMM, YYYY')}
          </Text>
        </NextLink>
        <Box mt={1} display={['none', 'block']} position="relative">
          <Collapse startingHeight={110} in={readMore}>
            <Text fontSize={['sm', 'xl']} color="gray.500" lineHeight="shorter">
              {video?.overview}
            </Text>
          </Collapse>
          <Box
            opacity={readMore ? 0 : 1}
            position="absolute"
            right={0}
            bottom={0}
            height={'50px'}
            w="full"
            bg="linear-gradient(to top, var(--chakra-colors-gray-900), rgba(0,0,0,0))"
          />
          <Button
            size="sm"
            onClick={() => setReadMore(!readMore)}
            variant="unstyled"
            color="blue.300"
            position="absolute"
            right={readMore ? '-8px' : 0}
            bottom={readMore ? '-8px' : 0}
            outline="none"
            _focus={{ outline: 'none' }}
          >
            Read {readMore ? 'Less' : 'More'}
          </Button>
        </Box>
      </Flex>
    </Flex>
  )
}
const VideoListRow: React.FC<{ videos: ResponseGeneralResults[]; mediaType?: MediaType }> = ({ videos, mediaType }) => {
  return (
    <List spacing={[4, 8]}>
      {videos?.map((video) => (
        <ListItem key={video.id}>
          <VidoeRow video={video} mediaType={mediaType} />
        </ListItem>
      ))}
    </List>
  )
}

export default VideoListRow
