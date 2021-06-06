import { AspectRatio, Box, Skeleton, VStack } from '@chakra-ui/react'
import React from 'react'

const VideoCardSkeleton = () => (
  <Box>
    <AspectRatio ratio={16 / 9} borderRadius="md" w="full" overflow="hidden">
      <Skeleton h="full" w="full" />
    </AspectRatio>
    <VStack align="flex-start" spacing={2} w="full" mt={2}>
      <Skeleton borderRadius="md" h="18px" w="80%" />
      <Skeleton borderRadius="md" h="18px" w="60%" />
    </VStack>
  </Box>
)

export default VideoCardSkeleton
