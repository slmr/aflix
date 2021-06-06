import axios from '@/utils/axios'
import { Alert, AlertIcon } from '@chakra-ui/alert'
import { Avatar } from '@chakra-ui/avatar'
import { Button } from '@chakra-ui/button'
import Icon from '@chakra-ui/icon'
import { Box, Flex, Heading, HStack, VStack, Text, Divider } from '@chakra-ui/layout'
import dayjs from 'dayjs'
import React, { FC, useState } from 'react'
import { IoStar } from 'react-icons/io5'
import { useQuery } from 'react-query'
import Truncate from 'react-truncate'

export interface AuthorDetails {
  name: string
  username: string
  avatar_path: string
  rating?: number
}

export interface ReviewType {
  author: string
  author_details: AuthorDetails
  content: string
  created_at: Date
  id: string
  updated_at: Date
  url: string
}

export interface ReviewsType {
  id: number
  page: number
  results: ReviewType[]
  total_pages: number
  total_results: number
}

const fetchData = async (id: number, mediaType: 'tv' | 'movie') => {
  const { data } = await axios.get<ReviewsType>(`${mediaType}/${id}/reviews`)
  return data
}

const Review: FC<{ data: ReviewType }> = ({ data }) => {
  const [readMore, setReadMore] = useState(false)

  function toggleReadMore() {
    setReadMore((prev) => !prev)
  }
  return (
    <Box w="full">
      <HStack spacing={3} align="center" justify="flex-start" mb={2}>
        <Avatar src={`https://image.tmdb.org/t/p/w45${data.author_details.avatar_path}`} />
        <Box>
          <Heading size="sm">{data.author}</Heading>
          <p>{dayjs(data.created_at).format('DD MMMM YYYY')}</p>
        </Box>
        {data.author_details.rating && (
          <Flex align="center" justify="center" borderRadius="md" minW="55px" bg="yellow.400" color="black">
            <Icon as={IoStar} boxSize={3} />
            <Text fontWeight="500">{data.author_details.rating}</Text>
          </Flex>
        )}
      </HStack>
      <Box>
        <Text color="gray.300" lineHeight={['normal', 'tall']} fontSize={['md', 'lg']}>
          <Truncate
            lines={!readMore && 4}
            ellipsis={
              <span>
                ...{' '}
                <Button size="sm" onClick={toggleReadMore} variant="link" colorScheme="blue">
                  Read more
                </Button>
              </span>
            }
          >
            {data.content}
          </Truncate>
          {readMore && (
            <Button size="sm" ml={2} onClick={toggleReadMore} variant="link" colorScheme="blue">
              {' '}
              Read less
            </Button>
          )}
        </Text>
      </Box>
      <Divider mt={[4, 4, 8]} />
    </Box>
  )
}

const Reviews: FC<{ id: number; mediaType: 'tv' | 'movie'; title: string }> = ({ id, mediaType, title }) => {
  const { data, status } = useQuery<ReviewsType>(['reviews', id], () => fetchData(id, mediaType), {
    refetchOnWindowFocus: false,
    enabled: Boolean(id)
  })
  return (
    <div>
      {status === 'loading' && <p>spinner</p>}
      {status === 'error' && <Box>Error</Box>}
      {status === 'success' && data.total_results > 0 ? (
        <VStack spacing={[4, 4, 8]} align="flex-start">
          {data.results.map((review) => (
            <Review key={review.id} data={review} />
          ))}
        </VStack>
      ) : (
        <Alert borderRadius="md">
          <AlertIcon />
          We don't have any reviews for {title}.
        </Alert>
      )}
    </div>
  )
}

export default Reviews
