import { Box, Center, Heading, Text, Image, Flex } from '@chakra-ui/react'
import React from 'react'

const Footer: React.FC = () => {
  return (
    <Box as="footer" h={[40, 64]} bg="gray.900" mt={[8]}>
      <Flex justify="center" align="center" direction="column" h="full">
        <a href="https://www.themoviedb.org/" target="_black" rel="noreferal">
          <Image src="/tmdb-logo.svg" width={['50px', '80px']} />
        </a>
        <Text mt={2} textAlign="center" fontSize={['sm', 'md']}>
          This website uses the TMDb API but is not endorsed or certified by TMDb
        </Text>
        <Text mt={[4, 8]} fontSize={['md', 'xl']}>
          Build by Affri © {new Date().getFullYear()}
        </Text>
      </Flex>
    </Box>
  )
}

export default Footer
