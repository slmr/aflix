import NextLink from '@/components/NextLink'
import SearchDrawer from '@/components/SearchDrawer'
import { Box, Flex, Icon, IconButton, useDisclosure } from '@chakra-ui/react'
import debounce from 'lodash/debounce'
import { useRouter } from 'next/router'
import React from 'react'
import { IoClose, IoMenu, IoSearch } from 'react-icons/io5'

interface HeaderProps {}

const linkStyle = {
  fontSize: ['2xl', '2xl', 'lg'],
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  mx: ['5vw', '5vw', 6],
  mb: [4, 4, 0],
  transition: 'color 150ms ease-in',
  '&:hover': {
    color: 'blue.500'
  }
}

const TopBar: React.FC<HeaderProps> = () => {
  const router = useRouter()
  const basePath = router.pathname.split('/')[1]
  const searchDrawer = useDisclosure()
  const expandedMenu = useDisclosure()
  const debounceToggleMenu = debounce(() => expandedMenu.onToggle(), 500)

  React.useEffect(() => {
    document.body.classList.toggle('menu-expanded', expandedMenu.isOpen)
  }, [expandedMenu.isOpen])

  return (
    <>
      <Box
        as="header"
        position="fixed"
        zIndex={100}
        top={0}
        left={0}
        right={0}
        bg="gray.900"
        transition="background 300ms ease-in"
        width="100%"
        height="55px"
        boxShadow="lg"
      >
        <Box margin="0 5%" display="flex" justifyContent="space-between" height="full" alignItems="center">
          {/* Menu button */}
          <IconButton
            variant="unstyled"
            p={0}
            minW="auto"
            h="auto"
            display={['inline-flex', 'inline-flex', 'none']}
            aria-label="Menu"
            onClick={debounceToggleMenu}
            icon={<Icon as={expandedMenu.isOpen ? IoClose : IoMenu} boxSize={8} />}
          />
          {/* Brand Title */}

          <Flex align="center" justify="center" mr={[0, 0, 8]}>
            <NextLink href="/" passHref>
              <Icon width={16} h="full" viewBox="0 0 204.469 85.75">
                <path
                  d="M5.365 60.71L18.375 0h12.25l11.8 55.056c-12.987 1.449-24.5 4.572-36.087 6.931l-.972-1.112zm19.134-42.335l-6.125 36.75h12.25l-6.125-36.75zm171.073 41.681a393.154 393.154 0 00-12.686-2.231L179.971 49l-2.651 8.029a452.018 452.018 0 00-11.4-1.512l4.862-14.221-15.313-41.3h12.25l12.25 33.688 12.25-33.688h12.25l-15.312 41.1 6.414 18.95zM55.891 54.65V0h33.687v9.188H68.141V36.75h15.313v9.187H68.141v7.832c-4.092.248-8.213.546-12.249.885zm91.492-.1a532.494 532.494 0 00-12.249-.856V0h12.251zm-52.206-1.762V0h12.25v52.773a586.411 586.411 0 00-12.25.02z"
                  fill="#4299e1"
                />
                <path
                  d="M192.124 85.75l-9.252-27.974q6.505 1.036 12.688 2.231l8.718 25.743zm-36.559 0l10.382-30.329q5.806.7 11.4 1.513l-9.532 28.816zm-20.431 0V52.698q6.2.362 12.251.857V85.75zm-39.956 0V51.793q3.509-.043 7.056-.043 2.6 0 5.192.023v24.79h21.438v9.187zm-39.286 0v-32.1q6.043-.508 12.25-.885V85.75zm-19.141 0l-4.594-21.437H16.843L12.25 85.75H0l5.366-25.04c11.489-2.339 23.9-4.273 37.039-5.739l6.6 30.779z"
                  fill="rgba(44,82,130,0.99)"
                />
              </Icon>
            </NextLink>
          </Flex>

          {/* Main Nav */}
          <Flex
            flex="1 1 0%"
            display={[expandedMenu.isOpen ? 'flex' : 'none', expandedMenu.isOpen ? 'flex' : 'none', 'flex']}
            align={['flex-start', 'flex-start', 'center']}
            flexDirection={['column', 'column', 'row']}
            bg={['gray.900', 'gray.900', 'transparent']}
            position={['absolute', 'absolute', 'relative']}
            h={['calc(100vh - 55px)', 'calc(100vh - 55px)', 'auto']}
            width={['full', 'full', 'auto']}
            top={['55px', '55px', 'unset']}
            left={[0, 0, 'unset']}
            right={[0, 0, 'unset']}
            bottom={[0, 0, 'unset']}
            py={[4, 4, 0]}
          >
            <NextLink sx={linkStyle} href="/movie" passHref>
              Movies
            </NextLink>
            <NextLink sx={linkStyle} href="/tv" passHref>
              TV Series
            </NextLink>
            <NextLink sx={linkStyle} href="/genres" passHref>
              Genres
            </NextLink>
          </Flex>
          {/* Right Nav */}
          <Flex display="flex" align="center">
            <IconButton
              variant="unstyled"
              p={0}
              minW="auto"
              h="auto"
              aria-label="Search"
              onClick={() => {
                if(basePath !== 'search') {
                  searchDrawer.onOpen()
                }
              }}
              icon={<Icon as={IoSearch} boxSize={7} strokeWidth={0.8} />}
            />

            <NextLink sx={{ ...linkStyle, display: ['none', 'none', 'flex'], mr: 0 }} href="/login">
              Log in
            </NextLink>
          </Flex>
        </Box>
      </Box>

      <SearchDrawer isOpen={searchDrawer.isOpen} onClose={searchDrawer.onClose} />
    </>
  )
}

export default TopBar
