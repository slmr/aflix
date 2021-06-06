import { Genre } from '@/type/movie'
import { SimpleGrid, Box, Heading } from '@chakra-ui/react'
import React from 'react'
import NextLink from './NextLink'

const colors = [
  '#f59b23',
  '#a0c3d2',
  '#4b917d',
  '#b05bba',
  '#b49bc8',
  '#509bf5',
  '#ffc864',
  '#ff6437',
  '#509bf5',
  '#f037a5',
  '#4fa999',
  '#b49bc8',
  '#4100f5',
  '#509bf5',
  '#90ba23'
]

const GenreList: React.FC<{ genres: Genre[]; mediaType: 'tv' | 'movie' }> = ({ mediaType, genres }) => {
  return (
    <SimpleGrid columns={[2, 6]} spacing={[4, 8]}>
      {genres.map((genre, i) => (
        <NextLink
          href={`/genres/${mediaType}/${genre.id}-${genre.name}`}
          key={genre.id}
        >
          <Box
            position="relative"
            background={colors.length <= i ? colors[i % colors.length] : colors[i]}
            width="full"
            height={[16, '6rem']}
            borderRadius="6px"
            overflow="hidden"
            p={[2, 4]}
            display="flex"
            alignItems="center"
          >
            <Heading size="sm">{genre.name}</Heading>
            <Box pos="absolute" top={0} left={0} bottom={0} right={0} />
          </Box>
        </NextLink>
      ))}
      <Box />
    </SimpleGrid>
  )
}

export default GenreList
