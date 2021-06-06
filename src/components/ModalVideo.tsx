import {
  AspectRatio,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Text
} from '@chakra-ui/react'
import React from 'react'
import ReactPlayer from 'react-player/lazy'
import { Video } from '../type/movie'
interface ModalVideoProps extends Omit<ModalProps, 'children'> {
  video: Video
}

const ModalVideo = ({ video, ...props }: ModalVideoProps): JSX.Element => {
  return (
    <Modal {...props}>
      <ModalOverlay>
        <ModalContent>
          <ModalHeader>
            <Text fontSize="md">Play {video?.type}</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} position="relative">
            <AspectRatio ratio={16 / 9}>
              {video && (
                <ReactPlayer
                  // style={{ position: 'absolute', top: 0, left: 0 }}
                  url={`https://www.youtube.com/watch?v=${video.key}`}
                  controls
                  width="full"
                  height="full"
                />
              )}
            </AspectRatio>
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  )
}

export default ModalVideo
