import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react'
import React from 'react'

const Error: React.FC<{ message?: string; description?: string }> = ({
  message = 'Newtork Error',
  description = 'The network connection is lost.'
}) => {
  return (
    <Alert
      status="error"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="200px"
      borderRadius="6px"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        {message}
      </AlertTitle>
      <AlertDescription maxWidth="sm">{description}</AlertDescription>
    </Alert>
  )
}

export default Error
