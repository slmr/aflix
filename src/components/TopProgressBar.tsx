import React, { FC, useEffect } from 'react'
import NProgress from 'nprogress'
import Router from 'next/router'
interface NextNProgressProps {
  color?: string
  startPosition?: number
  stopDelayMs?: number
  height?: number
  options?: any
}
const NextNProgress: FC<NextNProgressProps> = ({
  color = '#29D',
  startPosition = 0.3,
  stopDelayMs = 200,
  height = 3,
  options
}) => {
  let timer = null
  function routeChangeStart() {
    NProgress.set(startPosition)
    NProgress.start()
  }

  function routeChangeEnd() {
    clearTimeout(timer)
    timer = setTimeout(() => {
      NProgress.done(true)
    }, stopDelayMs)
  }

  useEffect(() => {
    if (options) {
      NProgress.configure(options)
    }

    Router.events.on('routeChangeStart', routeChangeStart)
    Router.events.on('routeChangeComplete', routeChangeEnd)
    Router.events.on('routeChangeError', routeChangeEnd)
  }, [])
  return (
    <style jsx global>{`
      #nprogress {
        pointer-events: none;
      }
      #nprogress .bar {
        background: ${color};
        position: fixed;
        z-index: 1031;
        top: 0;
        left: 0;
        width: 100%;
        height: ${height}px;
      }
      #nprogress .peg {
        display: block;
        position: absolute;
        right: 0px;
        width: 100px;
        height: 100%;
        box-shadow: 0 0 10px ${color}, 0 0 5px ${color};
        opacity: 1;
        -webkit-transform: rotate(3deg) translate(0px, -4px);
        -ms-transform: rotate(3deg) translate(0px, -4px);
        transform: rotate(3deg) translate(0px, -4px);
      }
      #nprogress .spinner {
        display: none;
      }
      #nprogress .spinner-icon {
        display: none;
      }
      .nprogress-custom-parent {
        overflow: hidden;
        position: relative;
      }
      .nprogress-custom-parent #nprogress .bar {
        position: absolute;
      }
    `}</style>
  )
}

export default NextNProgress
