import Icon from '@chakra-ui/icon'
import Image, { ImageProps } from 'next/image'
import React, { useState } from 'react'
import { IoImage } from 'react-icons/io5'

const MyImage = (props: ImageProps & { fallbackComponent?: JSX.Element }) => {
  const { fallbackComponent, ...rest } = props
  const [error, setError] = useState(false)

  return error ? (
    fallbackComponent || <Icon boxSize={20} as={IoImage} />
  ) : (
    <Image
      {...rest}
      onError={() => {
        setError(true)
      }}
    />
  )
}

export default MyImage
