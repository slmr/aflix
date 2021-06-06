import {
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import SearchInput from './SearchInput'

const SearchDrawer = ({ isOpen, onClose }) => {
  const initialRef = React.useRef<HTMLInputElement>()
  const router = useRouter()
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose()
      }}
      size="4xl"
      initialFocusRef={initialRef}
    >
      <ModalOverlay bg="var(--chakra-colors-blackAlpha-800)" />
      <ModalContent bg="transparent" boxShadow="none" mt={36}>
        <ModalCloseButton size="lg" zIndex={2} />
        <ModalBody>
          <SearchInput size="lg" ref={initialRef} onSubmit={(value) => router.push(`/search?query=${value}`, undefined)} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default SearchDrawer
