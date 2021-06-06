import { AspectRatio, Box, Button, Grid, GridItem, Text, useToast, Icon } from '@chakra-ui/react'
import React, { useState } from 'react'
import { IoChevronDownOutline, IoChevronUpOutline, IoPerson } from 'react-icons/io5'
import { Cast } from '../type/movie'
import Image from '@/components/Image'

const CastList = ({ casts, movieId }: { casts: Cast[]; movieId: number }): JSX.Element => {
  const [showLimit, setShowLimit] = useState(10)
  const toast = useToast()
  return (
    <Grid
      templateColumns={['1fr', '1fr', 'repeat(2, 1fr)']}
      gap={[6, 6, 4]}
      overflowX={['scroll', 'scroll', 'auto']}
      pb={4}
      width={['calc(100% + 10vw)', 'calc(100% + 10vw)', '100%']}
      ml={['-5vw', '-5vw', 0]}
      pl={['5vw', '5vw', 0]}
    >
      {casts.slice(0, showLimit).map((cast) => (
        <GridItem key={cast.id} gridRow={[1, 1, 'auto']} overflow={['unset', 'unset', 'hidden']}>
          <Box
            overflow="hidden"
            cursor="pointer"
            sx={{
              ':hover': {
                '.overlay-hover': {
                  opacity: 1
                }
              }
            }}
          >
            <Box
              bg="linear-gradient(90deg, rgb(167, 232, 236) 19.06%, rgb(12, 155, 255) 50.17%, rgb(159, 121, 243) 81.56%)"
              p="1px"
              borderRadius="full"
              position="relative"
              w="fit-content"
              h="full"
              margin="0 auto"
              overflow="hidden"
            >
              <Box
                className="overlay"
                position="absolute"
                top={'1px'}
                left={'1px'}
                right={'1px'}
                bottom={'1px'}
                bg="gray.900"
                borderRadius="full"
              />
              <Box
                className="overlay-hover"
                position="absolute"
                zIndex={1}
                top={'1px'}
                left={'1px'}
                right={'1px'}
                bottom={'1px'}
                borderRadius="full"
                transition="opacity 300ms ease-in-out"
                background="rgba(0,0,0,0.3)"
                opacity="0"
              />
              <AspectRatio ratio={1 / 1} w={['60px', '60px', '90px']} borderRadius="full" overflow="hidden">
                <Image
                  alt={cast.name}
                  src={`https://image.tmdb.org/t/p/w185${cast.profile_path}`}
                  layout="fill"
                  objectFit="cover"
                />
              </AspectRatio>
            </Box>
            <Box mt={1} textAlign="center">
              <Text lineHeight="shorter" isTruncated>
                {cast.name}
              </Text>
              <Text lineHeight="shorter" isTruncated color="gray.500">
                {cast.character}
              </Text>
            </Box>
          </Box>
        </GridItem>
      ))}
      {casts.length > 10 && (
        <GridItem colSpan={[0, 0, 2]} gridRow={[1, 1, 'auto']} alignSelf="center">
          <Button
            as="a"
            size="md"
            variant="ghost"
            colorScheme="blue"
            isFullWidth
            rightIcon={showLimit === casts.length ? <IoChevronUpOutline /> : <IoChevronDownOutline />}
            onClick={() =>
              setShowLimit((prev) => {
                if (prev === casts.length) {
                  return 10
                }
                if (prev + 10 > casts.length) {
                  return casts.length
                }
                return prev + 10
              })
            }
          >
            {showLimit === casts.length ? 'Show less' : 'Show more'}
          </Button>
        </GridItem>
      )}
    </Grid>
  )
}

export default CastList
