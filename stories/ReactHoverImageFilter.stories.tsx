import { ReactHoverImageFilter } from '../src'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import React from 'react'

export default {
  title: 'Example/ReactHoverImageFilter',
  component: ReactHoverImageFilter,
  parameters: {
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof ReactHoverImageFilter>

const Template: ComponentStory<typeof ReactHoverImageFilter> = args => (
  <ReactHoverImageFilter {...args} />
)

export const Primary = Template.bind({})

Primary.args = {
  pixelPaintedSize: 86,
  imageSrc: '/kiosco.jpg',
  canvasStyle: {
    position: 'relative',
    top: 0,
    left: 0
  },
  width: innerWidth,
  height: innerHeight,
  paintEvent: 'holdclick',
  fromFilter: 'grayScale(200%)',
  toFilter: 'grayScale(0%)'
}

export const Secondary = Template.bind({})
Secondary.args = {
  pixelPaintedSize: 86,
  imageSrc: '/flor.jpg',
  canvasStyle: {
    position: 'relative',
    top: 0,
    left: 0
  },
  width: innerWidth,
  height: innerHeight,
  paintEvent: 'holdclick',
  fromFilter: 'blur(4px)',
  toFilter: 'grayScale(0%)'
}
