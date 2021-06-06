import { AspectRatio, Box, Button, Flex, Heading, HStack, Icon, Text, VStack, Wrap, WrapItem } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import React from 'react'
import { MdStar } from 'react-icons/md'
import { MediaType } from '../type/movie'
import { ThumbnailHoveredData } from '../type/utils'
import Image from '@/components/Image'
import dataGenres from '../constant/genres.json'
interface QuickPreviewThumbnailProps {
  previewData: ThumbnailHoveredData
  thumbnailHovered: (data: ThumbnailHoveredData, cancelDebounce: () => void) => void
  mediaType?: MediaType
}

const QuickPreviewThumbnail: React.FC<QuickPreviewThumbnailProps> = ({ previewData, thumbnailHovered, mediaType }) => {
  const router = useRouter()
  
  function hidePreview() {
    thumbnailHovered(null, () => {})
  }

  const genres = dataGenres.movies.filter((genre) => previewData.video.genre_ids.includes(genre.id))

  let leftPosition = previewData.thumbnailPosition.centerX
  const element = document.querySelector('.container-video-list') as HTMLElement
  const distance = window.innerWidth - element?.offsetWidth
  if (window.innerWidth > 2300) {
    leftPosition = previewData.thumbnailPosition.centerX - (distance / 3 + 250)
  } else if (window.innerWidth > 3300) {
    leftPosition = previewData.thumbnailPosition.centerX - (distance / 3 + 150)
  } else if (leftPosition < -50) {
    leftPosition = previewData.thumbnailPosition.centerX + 120
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      borderRadius="32px"
      color="white"
      bg="gray.900"
      position="absolute"
      overflow="hidden"
      maxWidth="296px"
      boxShadow="dark-lg"
      zIndex={99}
      width="full"
      onMouseLeave={hidePreview}
      style={{
        top: `${previewData.thumbnailPosition.centerY}px`,
        left: `${leftPosition}px`
      }}
    >
      <Box position="relative" zIndex={1}>
        <AspectRatio ratio={16 / 9}>
          <Image
            layout="fill"
            src={`https://image.tmdb.org/t/p/w342${previewData.video.backdrop_path}`}
            fallbackComponent={<p>error</p>}
          />
        </AspectRatio>
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          background="linear-gradient(180deg, rgba(23,25,35,0.5) 0%, rgba(0,0,0,0) 24%, rgba(0,0,0,0.04) 60%, #171923 100%)"
        />
      </Box>
      <VStack mt={-16} zIndex={3} p={6} spacing={2} align="flex-start">
        <Heading lineHeight={1}>
          {previewData.video.title || previewData.video.name || previewData.video.original_title}{' '}
        </Heading>
        <Wrap spacing={1}>
          {genres.map((genre, index) => (
            <WrapItem key={genre.id}>
              <Text color="gray.400">{genre.name}</Text>
              {genres.length === index + 1 ? null : (
                <Box as="span" mr={1}>
                  ,
                </Box>
              )}
            </WrapItem>
          ))}
        </Wrap>
        <Flex align="center">
          <Icon display="inline" aria-label="Rating" as={MdStar} color="yellow.500" boxSize={6} />
          <Text ml={[1, 0]} display="inline">
            {previewData.video.vote_average} / 10
          </Text>
          <Box mx={2}>{' • '}</Box>
          <Text display="inline">
            {dayjs(previewData.video?.release_date).format('YYYY')}
          </Text>
        </Flex>
        <Box maxHeight="sm" overflowY="auto">
          <Text noOfLines={4} lineHeight="shorter" color="gray.400">
            {previewData.video.overview}
          </Text>
        </Box>
        <Button
          mt={3}
          w="full"
          onClick={() =>
            router.push(
              `/${previewData.video?.media_type ?? mediaType}/[id]`,
              `/${previewData.video?.media_type ?? mediaType}/${previewData.video.id}`
            )
          }
        >
          Details
        </Button>
      </VStack>
    </Box>
  )
}

export default QuickPreviewThumbnail
