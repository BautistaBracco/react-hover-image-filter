import React, { useEffect, useRef } from 'react'
import { isBrowser, isMobile } from 'react-device-detect'
import { converFromFilterToFilterOnEvent } from '../helpers/converFromFilterToFilterOnEvent'

import { useHoldPress } from '../hooks/useHoldPress'

type PaintEvent = 'mousemove' | 'holdclick'

interface ReactHoverImageFilterProps {
  /**
   * Size of the painted area in pixels (the size of the painted area is a square)
   */
  pixelPaintedSize: number
  /**  
  Image source 
  */
  imageSrc: string
  /**  
  Paint event: 'mousemove' or 'holdclick' (holdclick is a custom event that is triggered when the mouse is pressed and held down) 
  */
  paintEvent: PaintEvent
  /**
   Canvas style
   */
  canvasStyle?: React.CSSProperties
  /**  
  Canvas width 
  */
  width: number
  /**  
  Canvas height 
  */
  height: number
  /**  
  Filter to apply to the image when the mouse is not over the canvas 
  */
  fromFilter?: string
  /**  
  Filter to apply to the image when the mouse is over the canvas 
  */
  toFilter?: string
  /**  
  pixelatedEffectSize?: number 
  */
}

// component description: a simple canvas component that allows you to simulate paint effect with a mouse or finger simulating a paint brush applying a filter to the image on the coordinates of the mouse or finger position

// dont allow children to be passed to this component as it will break the canvas element
export function ReactHoverImageFilter ({
  pixelPaintedSize,
  imageSrc,
  canvasStyle,
  paintEvent,
  width,
  height,
  fromFilter = 'grayscale(100%)',
  toFilter = 'grayscale(0%)'
}: ReactHoverImageFilterProps) {
  // pixelatedEffectSize
  // create a ref to store the canvas DOM element
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const { isPaintingRef, handlers } = useHoldPress()

  useEffect(() => {
    const image = new Image()
    image.src = imageSrc
    image.crossOrigin = 'anonymous'

    image.addEventListener('load', () => {
      const canvas = canvasRef.current
      const newCanvas = document.createElement('canvas')

      if (!canvas || !newCanvas) return

      const ctx = canvas.getContext('2d', { willReadFrequently: true })
      const newCtx = newCanvas.getContext('2d', { willReadFrequently: true })

      newCanvas.width = width
      newCanvas.height = height

      if (!ctx || !newCtx) return

      ctx.filter = fromFilter
      newCtx.filter = toFilter

      ctx.drawImage(image, 0, 0, canvas.width, canvas.height)

      // if (pixelatedEffectSize && pixelatedEffectSize > 0)
      //   pixelate(pixelatedEffectSize, ctx, canvas.width, canvas.height)

      newCtx.drawImage(image, 0, 0, canvas.width, canvas.height)

      const fromPixels = ctx.getImageData(
        0,
        0,
        newCanvas.width,
        newCanvas.height
      )

      const toPixels = newCtx.getImageData(0, 0, canvas.width, canvas.height)

      canvas.addEventListener(isBrowser ? 'mousemove' : 'touchmove', event => {
        if (isPaintingRef.current || paintEvent !== 'holdclick' || isMobile) {
          converFromFilterToFilterOnEvent(
            fromPixels,
            toPixels,
            event,
            ctx,
            pixelPaintedSize
          )
        }
      })
    })

    return () => {
      const canvas = canvasRef.current

      if (!canvas) return

      canvas.removeEventListener('mousemove', () => {
        return
      })
      image.removeEventListener('load', () => {
        return
      })
    }
  }, [])

  return (
    <canvas
      {...handlers}
      ref={canvasRef}
      width={width}
      height={height}
      style={{ ...canvasStyle }}
    />
  )
}

export default ReactHoverImageFilter
