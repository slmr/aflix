import { extendTheme } from "@chakra-ui/react"

const fonts = { body: 'Lato, sans-serif', mono: `'Menlo', monospace` }

export const mediaQuery = {
  sm: '@media (min-width: 30em)',
  md: '@media (min-width: 48em)',
  lg: '@media (min-width: 62em)',
  xl: '@media (min-width: 62em)'
}

const theme = extendTheme({ fonts, config: { initialColorMode: 'dark', useSystemColorMode: false,}})

export default theme
