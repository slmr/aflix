import { Box, Button, Flex, Heading, HStack, Icon, useMediaQuery } from '@chakra-ui/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { IoChevronForward } from 'react-icons/io5'
import { useQuery } from 'react-query'
import { MediaType } from '../type/movie'
import { ResponseGeneral } from '../type/response'
import { ThumbnailHoveredData } from '../type/utils'
import axios from '../utils/axios'
import Error from './Error'
import NextLink from './NextLink'
import QuickPreviewThumbnail from './QuickPreviewThumbnail'
import Caraousel from './Slider'
import VideoThumbnail from './VideoThumbnail'
import VideoThumbnailSkeleton from './VideoThumbnailSkeleton'

interface VideoListProps {
  title?: string
  fetchKey: string
  fetchUrl: string
  mediaType?: MediaType
  mode?: 'horizontal' | 'vertical'
  link?: string
}
const fetchData = async (url: string) => {
  const { data } = await axios.get<ResponseGeneral>(url)
  return data
}

const VideoList: React.FC<VideoListProps> = ({ title, fetchKey, fetchUrl, mediaType, link }) => {
  const { data, status } = useQuery<ResponseGeneral>([fetchKey, fetchUrl], () => fetchData(fetchUrl), {
    refetchOnWindowFocus: false
  })
  const [isComponentMounted, setIsComponentMounted] = useState(false)
  const [previewData, setPreviewData] = useState<ThumbnailHoveredData | null>(null)
  const [cancelDebounce, setCancelDebounce] = useState(() => () => {})
  const [isMobile] = useMediaQuery('(max-width: 480px)')

  useEffect(() => {
    setIsComponentMounted(true)
    return () => setIsComponentMounted(false)
  }, [])

  function hovered(dataPreview: ThumbnailHoveredData, cancelDebounceFunction: () => void) {
    cancelDebounce()
    if (isComponentMounted) {
      setCancelDebounce(() => cancelDebounceFunction)
      setPreviewData(dataPreview)
    }
  }

  return (
    <Box
      pos="relative"
      sx={{
        '.slick-slider:hover .slick-arrow': {
          opacity: 1
        },
        '.slick-slide': {
          pl: '10px'
        },
        '.slick-list': {
          overflow: 'visible',
          ml: '-10px'
        }
      }}
    >
      <Flex justify="space-between" align="center" mb={3}>
        <Heading
          fontSize={['xl', '2xl']}
          fontWeight="bold"
          sx={{
            ':hover': {
              color: link ? 'blue.500' : "white"
            }
          }}
        >
          {link ? (
            <NextLink passHref href={link}>
              {title}
            </NextLink>
          ) : (
            title
          )}
        </Heading>
        {link && (
          <Link href={link} passHref>
            <Button as="a" variant="link" size="sm" colorScheme="blue" rightIcon={<Icon as={IoChevronForward} />} p={0}>
              See All
            </Button>
          </Link>
        )}
      </Flex>

      {status === 'loading' ? (
        <HStack spacing="15px">
          {Array.from({ length: isMobile ? 3 : 7 }, (_, i) => (
            <VideoThumbnailSkeleton key={i} />
          ))}
        </HStack>
      ) : status === 'error' ? (
        <Error />
      ) : (
        <Caraousel>
          {data?.results.map((video, index) => (
            <VideoThumbnail
              key={video.id}
              video={video}
              thumbnailHovered={hovered}
              link={{
                href: `/${video?.media_type || mediaType}/[id]`,
                as: `/${video?.media_type || mediaType}/${video.id}`
              }}
            />
          ))}
        </Caraousel>
      )}

      {previewData && !isMobile && window.innerWidth > 767 && (
        <QuickPreviewThumbnail previewData={previewData} thumbnailHovered={hovered} mediaType={mediaType} />
      )}
    </Box>
  )
}

export default VideoList
