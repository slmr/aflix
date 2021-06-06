import React from 'react'
import { Spinner, Center, BoxProps } from '@chakra-ui/react'

const Loading = (props: BoxProps): JSX.Element => {
  return (
    <Center height="100%" width="100%" {...props}>
      <Spinner thickness="4px" speed="0.65s" emptyColor="gray.600" color="gray.50" size="xl" />
    </Center>
  )
}

export default Loading
