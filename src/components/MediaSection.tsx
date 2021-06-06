import Image from '@/components/Image'
import { AspectRatio, Box, Grid, GridItem, Icon, Text, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { IoPlayCircle } from 'react-icons/io5'
import { Video } from '../type/movie'
import ModalVideo from './ModalVideo'

interface MediaSectionProps {
  videos: Video[]
}

const MediaSection: React.FC<MediaSectionProps> = ({ videos }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [previewVideo, setPreviewVideo] = useState<Video | null>()
  function openPreviewVideo(video) {
    setPreviewVideo(video)
    onOpen()
  }
  function closePreviewVideo() {
    onClose()
    setPreviewVideo(null)
  }

  return (
    <>
      <Grid templateColumns={['repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)']} gap={[3, 4]}>
        {videos.map((video) => (
          <GridItem key={video.id} cursor="pointer" onClick={() => openPreviewVideo(video)}>
            <AspectRatio
              ratio={16 / 9}
              position="relative"
              borderRadius="6px"
              overflow="hidden"
              bg="gray.700"
              sx={{
                ':hover': {
                  boxShadow: 'dark-md',
                  '.overlay': {
                    opacity: 1
                  },
                  '.play-icon': {
                    color: 'blue.500'
                  }
                }
              }}
            >
              <Box>
                <Image src={`https://i.ytimg.com/vi/${video.key}/mqdefault.jpg`} layout="fill" objectFit="cover" />
                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  zIndex={2}
                >
                  <Icon
                    className="play-icon"
                    transition="color 200ms ease-in"
                    cursor="pointer"
                    as={IoPlayCircle}
                    boxSize={[8, 12]}
                  />
                </Box>
                <Box
                  className="overlay"
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  opacity={0}
                  transition="opacity 300ms ease-in"
                  background="linear-gradient(0deg, rgb(0 0 0 / 49%) 0%, rgb(0 0 0 / 36%) 52%)"
                />
              </Box>
            </AspectRatio>
            <Box py={1}>
              <Text>{video.type}</Text>
            </Box>
          </GridItem>
        ))}
      </Grid>
      <ModalVideo
        isOpen={isOpen}
        onClose={closePreviewVideo}
        isCentered
        closeOnOverlayClick={false}
        size="4xl"
        video={previewVideo}
      />
    </>
  )
}

export default MediaSection
