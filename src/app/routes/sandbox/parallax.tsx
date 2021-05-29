import { config, useSpring } from 'react-spring'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { Layer, Root, StoryWrapper } from './parallax-styles'
import { useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { ReactElement } from 'react'
import { thin } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useGesture } from 'react-use-gesture'

export function ParallaxSandboxRoute(): ReactElement {
  const wrapperRef = useRef<HTMLDivElement>(null)

  const w = { max: window.innerWidth * 0.5, min: window.innerWidth * -0.5 }

  const [springValue, animate] = useSpring(() => ({
    config: config.gentle,
    scroll: 0,
  }))

  useGesture(
    {
      onWheel: ({ offset: [scroll] }) => {
        animate({
          scroll,
        })
      },
    },
    {
      domTarget: wrapperRef,
      wheel: {
        bounds: {
          left: w.min,
          right: w.max,
        },
      },
    },
  )

  useEffect(() => {
    const el = wrapperRef.current

    if (!el) return

    disableBodyScroll(el)

    return () => enableBodyScroll(el)
  }, [wrapperRef])

  return (
    <Root>
      <StoryWrapper ref={ wrapperRef }>
        <Layer
          $depth={ 1 }
          style={{
            x: springValue.scroll.to(
              {
                output: ['-100%', '100%'],
                range: [w.min, w.max],
              },
            ),
          }}>
          <FontAwesomeIcon icon={ thin('cube') } />
        </Layer>
        <Layer
          $depth={ 2 }
          style={{
            x: springValue.scroll.to(
              {
                output: ['-75%', '75%'],
                range: [w.min, w.max],
              },
            ),
          }}>
          <FontAwesomeIcon icon={ thin('box-archive') } />
        </Layer>
        <Layer
          $depth={ 3 }
          style={{
            x: springValue.scroll.to(
              {
                output: ['-50%', '50%'],
                range: [w.min, w.max],
              },
            ),
          }}>
          <FontAwesomeIcon icon={ thin('browser') } />
        </Layer>
        <Layer
          $depth={ 4 }
          style={{
            x: springValue.scroll.to(
              {
                output: ['-25%', '25%'],
                range: [w.min, w.max],
              },
            ),
          }}>
          <FontAwesomeIcon icon={ thin('window') } />
        </Layer>
        <Layer
          $depth={ 5 }
          style={{
            x: springValue.scroll.to(
              {
                output: ['-10%', '10%'],
                range: [w.min, w.max],
              },
            ),
          }}>
          <FontAwesomeIcon icon={ thin('folder') } />
        </Layer>
      </StoryWrapper>
    </Root>
  )
}