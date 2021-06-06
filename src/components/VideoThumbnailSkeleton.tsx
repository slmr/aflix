import { AspectRatio, Box, Skeleton } from '@chakra-ui/react'
import React from 'react'

const VideoThumbnailSkeleton: React.FC<{ withText?: boolean }> = ({ withText }) => (
  <Box borderRadius="6px" overflow="hidden" w="full" h="full">
    <AspectRatio ratio={10 / 16} cursor="pointer">
      <Skeleton />
    </AspectRatio>
    {withText && (
      <>
        <Skeleton borderRadius="3px" mt={2} h={2} w="full" />
        <Skeleton borderRadius="3px" mt={1} h={2} w="50%" />
      </>
    )}
  </Box>
)

export default VideoThumbnailSkeleton
