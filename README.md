## react-hover-image-filter

A simple canvas component that allows you to simulate paint effect with a mouse or finger simulating a paint brush applying a filter to the image on the coordinates of the mouse or finger position

## Installation

```bash
npm install react-hover-image-filter
```

## Usage

```jsx
import React from 'react'
import HoverImageFilter from 'react-hover-image-filter'


const App = () => {
  return (

      <HoverImageFilter
        image="/beatles.jpg"
        fromFilter="blur(10px)"
        width=500
        height=500
        pixelPaintedSize: 46,
      />

  )
}

export default App
```

## Visual Examples

### From blur filter to no filter

![Example 1](https://github.com/Pepito27/react-hover-image-filter/blob/main/gif%20blur.gif?raw=true)

### From sepia filter to no filter

![Example 2](https://github.com/Pepito27/react-hover-image-filter/blob/main/gif%20sepia.gif?raw=true)

## Props

| Prop | Type | Required | Default | Description |
| ---- | ---- | -------- | ------- | ----------- |

| imageSrc | string | true | - | The image to be filtered |
|paintEvent | "mousemove" || "holdclick" | false | "mousemove" | The event to be used to paint the image. It can be "mousemove" or "holdclick" |
| fromFilter | string | false | "grayscale(100%)" | The filter to be applied to the image |
| toFilter | string | false |
| "grayscale(0%)" | The filter to be applied to the image when the mouse is over the image |
| width | number | true |
| - | The width of the image |
| height | number | true |
| - | The height of the image |
| pixelPaintedSize | number | true |
| - | The size of the pixel painted on the image |
|canvasStyle | object | false | - | The style of the canvas |
| canvasClassName | string | false | - | The className of the canvas |

## License

[MIT](https://choosealicense.com/licenses/mit/)
