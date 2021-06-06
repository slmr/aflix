import { Box } from '@chakra-ui/react'
import DefaultNextLink, { LinkProps } from 'next/link'
import React, { FC } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const NextLink: FC<LinkProps & any> = ({
  children,
  href,
  as,
  replace,
  scroll,
  shallow,
  passHref,
  prefetch,
  ...props
}) => (
    <DefaultNextLink
      href={href}
      as={as}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      prefetch={prefetch}
      passHref
    >
      <Box as="a" {...props}>
        {children}
      </Box>
    </DefaultNextLink>
  )

export default NextLink
