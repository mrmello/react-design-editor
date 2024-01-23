import { fabric } from 'fabric'

export const CanvasObjects = {
  text: {
    render: options => {
      const { text, ...textOptions } = options
      return new fabric.Textbox(text, textOptions)
    },
  },
  image: {
    render: (options, cb) => {
      return fabric.Image.fromURL(options.src, cb)
    },
  },
}
