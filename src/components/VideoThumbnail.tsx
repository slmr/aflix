import { AspectRatio, Box, BoxProps, Flex, Icon, IconButton, Text } from '@chakra-ui/react'
import _debounce from 'lodash/debounce'
import React from 'react'
import { IoPlay, IoStar } from 'react-icons/io5'
import { MediaType } from '../type/movie'
import { ThumbnailHoveredData } from '../type/utils'
import Image from '@/components/Image'
import NextLink from './NextLink'

interface VideoThumbnailProps extends BoxProps {
  video: any
  mediaType?: MediaType
  thumbnailHovered?: (data: ThumbnailHoveredData, cancelDebounce: () => void) => void
  showRating?: boolean
  link: { href: string; as: string }
}

const VideoThumbnail: React.FC<VideoThumbnailProps> = ({
  video,
  thumbnailHovered,
  showRating = true,
  link,
  children,
  ...props
}) => {
  const showPreview = (event) => {
    event.persist()
    const targetNode = event.target.getBoundingClientRect()
    const thumbnailPosition = {
      centerX: targetNode.left - (298 - targetNode.width),
      centerY: -45
    }
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    thumbnailHovered({ video, thumbnailPosition }, delayedCallback.cancel)
  }
  const delayedCallback = _debounce(showPreview, 500)

  const onMouseEnter = (event) => {
    event.persist()
    delayedCallback(event)
  }
  const onMouseLeave = () => {
    delayedCallback.cancel()
  }
  return (
    <Box bg="gray.900" borderRadius="6px" overflow="hidden" {...props}>
      <NextLink {...link} passHref onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <AspectRatio
          ratio={10 / 16}
          cursor="pointer"
          background="linear-gradient(0deg, rgba(31, 31, 31, 0.45) 0%, rgba(31, 31, 31, 0) 52%)"
        >
          <Box
            borderRadius="6px"
            sx={{
              '&:hover': {
                '.overlay': {
                  opacity: 1
                }
              }
            }}
          >
            <Image
              layout="fill"
              alt={video.title || video.original_title || video.season_name}
              src={`https://image.tmdb.org/t/p/w342${video.poster_path}`}
            />
            <Box
              className="overlay"
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              background="linear-gradient(180deg,rgba(0,0,0,.17) 0,rgba(0,0,0,.72))"
              opacity={0}
              transition="all .3s ease"
            >
              <IconButton
                zIndex={2}
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                aria-label="Detail"
                colorScheme="blue"
                variant="ghost"
                icon={<Icon as={IoPlay} boxSize={8} />}
                isRound
                size="lg"
                h={16}
                minW={16}
              />
            </Box>
            {showRating && (
              <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                background="linear-gradient(45deg,transparent 50%,rgba(0,0,0,.03) 52%,rgba(0,0,0,.74))"
                transition="all .3s ease"
              >
                <Flex
                  pos="absolute"
                  right={['5px', '8px']}
                  top={['3px', '8px']}
                  width="auto"
                  justify="center"
                  align="center"
                >
                  <Text>{video.vote_average.toFixed(1)}</Text>
                  <Icon aria-label="Rating" as={IoStar} color="yellow.500" boxSize={5} />
                </Flex>
              </Box>
            )}
          </Box>
        </AspectRatio>
      </NextLink>
      {children}
    </Box>
  )
}

export default VideoThumbnail
