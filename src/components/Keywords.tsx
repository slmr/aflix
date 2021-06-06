import { Flex, Tag, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { fetchKeywordUrl } from '../constant'
import { Keyword } from '../type/tv'

const Keywords: React.FC<{ keywords: Keyword[] }> = ({ keywords }) => {
  const router = useRouter()
  return (
    <Flex flexWrap="wrap">
      {keywords.length > 0 ? (
        keywords.map((keyword) => (
          <Tag
            size="md"
            key={keyword.id}
            colorScheme="blue"
            mr={3}
            mb={3}
            cursor="pointer"
            onClick={() => router.push('/keyword/[id]', fetchKeywordUrl(keyword.id))}
          >
            {keyword.name}
          </Tag>
        ))
      ) : (
        <Text>No keywords have been added.</Text>
      )}
    </Flex>
  )
}

export default Keywords
