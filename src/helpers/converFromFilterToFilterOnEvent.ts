export function converFromFilterToFilterOnEvent (
  fromPixels: ImageData,
  toPixels: ImageData,
  event: TouchEvent | MouseEvent,
  ctx: CanvasRenderingContext2D,
  pixelPaintedSize: number
) {
  for (let i = 0; i < pixelPaintedSize; i++) {
    for (let j = 0; j < pixelPaintedSize; j++) {
      // pass pixels of the image with grayscale applied to it and revert it back to normal color when the mouse is clicked the pixels will be painted with the color of the image before the greyscale was applied to it
      let x = 0
      let y = 0
      let eventOffsetX = 0
      let eventOffsetY = 0
      if (event instanceof MouseEvent) {
        x = event.offsetX + i - pixelPaintedSize / 2
        y = event.offsetY + j - pixelPaintedSize / 2
        eventOffsetX = event.offsetX
        eventOffsetY = event.offsetY
      }
      if (event instanceof TouchEvent) {
        x = event.touches[0].clientX + i - pixelPaintedSize / 2
        y = event.touches[0].clientY + j - pixelPaintedSize / 2
        eventOffsetX = event.touches[0].clientX
        eventOffsetY = event.touches[0].clientY
      }
      // when the mouse is clicked in the border of the image the pixels won´t be painted in the opposite side of the image because the index of the pixels will be negative and the pixels will be painted in the opposite side of the image

      if (x < 0 || y < 0 || x >= toPixels.width || y >= toPixels.height)
        continue

      const index = (x + y * toPixels.width) * 4

      // take the value of red, green and blue before the greyscale was applied to it and paint the pixels with that color

      const distance = Math.sqrt(
        Math.pow(eventOffsetX - x, 2) + Math.pow(eventOffsetY - y, 2)
      )

      if (distance < pixelPaintedSize / 2) {
        fromPixels.data[index] = toPixels.data[index]

        fromPixels.data[index + 1] = toPixels.data[index + 1]

        fromPixels.data[index + 2] = toPixels.data[index + 2]
      }
    }
  }
  ctx.putImageData(fromPixels, 0, 0)
}

export function pixelate (
  sample_size: number,
  _ctx: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasHeight: number
) {
  const context = _ctx

  const sourceBuffer32 = new Uint32Array(
    context.getImageData(0, 0, canvasWidth, canvasHeight).data.buffer
  )

  // create an alternative to the nested for loop below without losing performance and without using the nested for loop below

  for (let y = 0; y < canvasHeight; y += sample_size) {
    for (let x = 0; x < canvasWidth; x += sample_size) {
      const index = x + y * canvasWidth

      const b = (sourceBuffer32[index] >> 16) & 0xff
      const g = (sourceBuffer32[index] >> 8) & 0xff
      const r = (sourceBuffer32[index] >> 0) & 0xff

      context.fillStyle = `rgb(${r}, ${g}, ${b})`
      context.fillRect(x, y, sample_size, sample_size)
    }
  }
}
