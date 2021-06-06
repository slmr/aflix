import { Box } from '@chakra-ui/react'
import React from 'react'
import Footer from '@/components/Footer'
import Header from '@/components/Header'


if (typeof window !== 'undefined') {
  console.groupCollapsed(
    '%c🙌 Site credits',
    'display:block;padding:0.125em 1em;font-family:courier;font-size:16px;font-weight:bold;line-height:2;text-transform:uppercase;background:#040d21;color:white;'
  )
  console.log(
    '%cWeb Development by Affri \n– https://t.me/affrii',
    'display:block;font-family:courier;font-size:14px;font-weight:bold;line-height:1;color:black;background:white;'
  )
  console.groupEnd()
}

const Layout: React.FC = ({ children }) => {
  return (
    <Box position="relative">
      <Header />
      <Box width="full" height="full" pos="relative">
        {children}
      </Box>
      <Footer />
    </Box>
  )
}

export default Layout
