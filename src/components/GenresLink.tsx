import { Box } from '@chakra-ui/react'
import React from 'react'
import { Genre, MediaType } from '../type/movie'
import NextLink from './NextLink'

interface GenresLinkProps {
  genres: Genre[]
  mediaType: Exclude<MediaType, 'person'>
}

const GenresLink = ({ genres, mediaType }: GenresLinkProps) => {
  return (
    <>
      {genres.map((genre, index) => (
        <React.Fragment key={genre.id}>
          <NextLink
            sx={{
              '&:hover': {
                textDecoration: 'underline'
              }
            }}
            color={['blue.500', 'white']}
            href={`/genres/[${mediaType}]/[id]`}
            as={`/genres/${mediaType}/${genre.id}-${genre.name}`}
          >
            {genre.name}
          </NextLink>
          {genres.length === index + 1 ? null : (
            <Box as="span" mr={1}>
              ,
            </Box>
          )}
        </React.Fragment>
      ))}
    </>
  )
}

export default GenresLink
