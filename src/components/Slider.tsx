import { Box, chakra, Icon } from '@chakra-ui/react'
import React from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider, { CustomArrowProps, Settings } from 'react-slick'
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5'

function ArrowLeft(props: CustomArrowProps) {
  const { onClick, className } = props
  return (
    <chakra.button
      onClick={onClick}
      className={className}
      zIndex={1}
      left="calc(-5% - 10px)"
      width="100px"
      height="full"
      opacity={0}
      sx={{
        transition: 'opacity 0.4s ease-out',
        '::before': {
          display: 'none'
        },
        '&.slick-disabled': {
          opacity: '0 !important'
        },
        bg: 'linear-gradient(to left, transparent, rgb(26 32 44 / 69%), rgb(26, 32, 44))!important',
        '::hover, ::focus': {
          bg: 'linear-gradient(to left, transparent, rgb(26 32 44 / 69%), rgb(26, 32, 44))!important'
        }
      }}
    >
      <Icon boxSize={10} color="white" as={IoChevronBackOutline} />
    </chakra.button>
  )
}

function ArrowRight(props: CustomArrowProps) {
  const { onClick, className } = props
  return (
    <chakra.button
      onClick={onClick}
      className={className}
      right="calc(-5% - 10px)"
      width="100px"
      height="full"
      opacity={0}
      sx={{
        transition: 'opacity 0.4s ease-out',
        '::before': {
          display: 'none'
        },
        '&.slick-disabled': {
          opacity: '0 !important'
        },
        bg: 'linear-gradient(to right, transparent, rgb(26 32 44 / 69%), rgb(26, 32, 44))!important',
        '::hover, ::focus': {
          bg: 'linear-gradient(to right, transparent, rgb(26 32 44 / 69%), rgb(26, 32, 44))!important'
        }
      }}
    >
      <Icon boxSize={10} color="white" as={IoChevronForwardOutline} />
    </chakra.button>
  )
}

const sliderConfig = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 7,
  slidesToScroll: 7,
  responsive: [
    {
      breakpoint: 320,
      settings: { slidesToScroll: 2, slidesToShow: 3, draggable: true, arrows: false }
    },
    {
      breakpoint: 360,
      settings: { slidesToScroll: 2, slidesToShow: 3, draggable: true, arrows: false }
    },
    {
      breakpoint: 768,
      settings: { slidesToScroll: 2, slidesToShow: 4, draggable: true, arrows: false }
    },
    { breakpoint: 1025, settings: { slidesToScroll: 7, slidesToShow: 7, draggable: false } },
  ],
  prevArrow: <ArrowLeft />,
  nextArrow: <ArrowRight />
}

const Caraousel: React.FC<{ setttings?: Settings }> = ({ children, setttings }) => {
  return (
    <Slider {...sliderConfig} {...setttings} draggable={false}>
      {children}
    </Slider>
  )
}

export default Caraousel
