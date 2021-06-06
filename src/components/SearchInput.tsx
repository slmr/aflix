import { FormControl, Input, FormLabel } from '@chakra-ui/react'
import React, { useEffect, } from 'react'

type SearchInputProps = {
  onSubmit: (value: string) => void
  initialValue?: string
  size?: 'lg' | 'sm'
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ onSubmit, initialValue, size = 'sm' }, ref) => {
    const [value, setValue] = React.useState('')

    useEffect(() => {
      setValue(initialValue || '')
    }, [initialValue])

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (value !== '') {
            onSubmit(value)
          }
        }}
      >
        <FormControl id="search" size="xl">
          <FormLabel fontSize={size === 'sm' ? 'sm' : 'md'} color={size === 'sm' ? 'gray.200' : 'gray.600'}>
            Search AFLIX
          </FormLabel>
          <Input
            py={size === 'sm' ? 6 : 8}
            ref={ref}
            onChange={(e) => {
              setValue(e.target.value)
            }}
            value={value}
            fontSize={size === 'sm' ? '3xl' : '5xl'}
            fontWeight="bold"
            type="text"
            variant="flushed"
          />
        </FormControl>
      </form>
    )
  }
)

export default SearchInput
