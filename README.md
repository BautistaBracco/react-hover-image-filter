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

## Visual Example

![Example](gif%20blur.gif)

## Props

| Prop             | Type   | Default           | Description                                                            |
| ---------------- | ------ | ----------------- | ---------------------------------------------------------------------- |
| image            | string | -                 | The image to be filtered                                               |
| fromFilter       | string | "grayscale(100%)" | The filter to be applied to the image                                  |
| toFilter         | string | "grayscale(0%)"   | The filter to be applied to the image when the mouse is over the image |
| width            | number | -                 | The width of the image                                                 |
| height           | number | -                 | The height of the image                                                |
| pixelPaintedSize | number | -                 | The size of the pixel painted on the image                             |

## License

[MIT](https://choosealicense.com/licenses/mit/)
