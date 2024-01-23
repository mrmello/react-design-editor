import { fabric } from 'fabric'
import { useCanvasContext } from '@components/Canvas/hooks'
import { useCallback } from 'react'
import { CanvasObjects } from '@components/Canvas'
import { propertiesToInclude } from '../constants/contants'

const template = {"id":"Quq4g9-joIhYgAFk__YIV","type":"GRAPHIC","name":"Untitled Design","frame":{"width":1200,"height":1200},"scenes":[{"id":"Cg1458CpkgfcNzFse-Rho","layers":[{"id":"background","name":"Initial Frame","angle":0,"stroke":null,"strokeWidth":0,"left":0,"top":0,"width":1200,"height":1200,"opacity":1,"originX":"left","originY":"top","scaleX":1,"scaleY":1,"type":"Background","flipX":false,"flipY":false,"skewX":0,"skewY":0,"visible":true,"shadow":{"color":"#fcfcfc","blur":4,"offsetX":0,"offsetY":0,"affectStroke":false,"nonScaling":false},"fill":"#F8E71D","metadata":{}},{"id":"98EdqEwYWtPkLFzmnT7Q3","name":"StaticText","angle":0,"stroke":null,"strokeWidth":0,"left":109.15,"top":134.31,"width":420,"height":224.55,"opacity":1,"originX":"left","originY":"top","scaleX":1,"scaleY":1,"type":"StaticText","flipX":false,"flipY":false,"skewX":0,"skewY":0,"visible":true,"shadow":null,"charSpacing":0,"fill":"#333333","fontFamily":"OpenSans-Bold","fontSize":92,"lineHeight":1.16,"text":"Hye JUDE","textAlign":"center","fontURL":"https://fonts.gstatic.com/s/opensans/v27/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsg-1y4nY1M2xLER.ttf","metadata":{}},{"id":"E2mcHFkwGA-MTJcfl3Abs","name":"StaticPath","angle":0,"stroke":null,"strokeWidth":0,"left":167.38,"top":566.5,"width":60,"height":60,"opacity":1,"originX":"left","originY":"top","scaleX":9.19,"scaleY":2,"type":"StaticPath","flipX":false,"flipY":false,"skewX":0,"skewY":0,"visible":true,"shadow":null,"path":[["M",60,0],["L",0,0],["L",0,60],["L",60,60],["L",60,0],["Z"]],"fill":"#ff4040","metadata":{}},{"id":"TCU2EB0sH6yMjsN92qRfo","name":"StaticText","angle":0,"stroke":null,"strokeWidth":0,"left":398.89,"top":588.54,"width":420,"height":103.96,"opacity":1,"originX":"left","originY":"top","scaleX":1,"scaleY":1,"type":"StaticText","flipX":false,"flipY":false,"skewX":0,"skewY":0,"visible":true,"shadow":null,"charSpacing":0,"fill":"#ffffff","fontFamily":"OpenSans-Bold","fontSize":92,"lineHeight":1.16,"text":"OLE","textAlign":"center","fontURL":"https://fonts.gstatic.com/s/opensans/v27/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsg-1y4nY1M2xLER.ttf"},{"id":"E2mcHFkwGA-MTJcfl3Abs","name":"StaticPath","angle":0,"stroke":null,"strokeWidth":0,"left":290.28,"top":704.45,"width":60,"height":60,"opacity":1,"originX":"left","originY":"top","scaleX":10.32,"scaleY":0.18,"type":"StaticPath","flipX":false,"flipY":true,"skewX":0,"skewY":0,"visible":true,"shadow":null,"path":[["M",60,0],["L",0,0],["L",0,60],["L",60,60],["L",60,0],["Z"]],"fill":"#161616","metadata":{}},{"id":"UXU4h1xR-M_oVOkbTw0g6","name":"StaticPath","angle":0,"stroke":null,"strokeWidth":0,"left":143.05,"top":983.07,"width":60,"height":60,"opacity":1,"originX":"left","originY":"top","scaleX":7.77,"scaleY":0.18,"type":"StaticPath","flipX":false,"flipY":true,"skewX":0,"skewY":0,"visible":true,"shadow":null,"path":[["M",60,0],["L",0,0],["L",0,60],["L",60,60],["L",60,0],["Z"]],"fill":"#161616","metadata":{}},{"id":"q90tPwjEQLoRtYnae-x2q","name":"StaticImage","angle":0,"stroke":null,"strokeWidth":0,"left":469.59000000000003,"top":27.900000000000006,"width":650,"height":650,"opacity":1,"originX":"left","originY":"top","scaleX":1,"scaleY":1,"type":"StaticImage","flipX":false,"flipY":false,"skewX":0,"skewY":0,"visible":true,"shadow":null,"src":"https://images.pexels.com/photos/4275360/pexels-photo-4275360.jpeg?auto=compress&cs=tinysrgb&h=650&w=940","cropX":0,"cropY":0,"metadata":{}}],"name":"Temp1"}],"metadata":{},"preview":""}
function getRandomNum(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomLeftTop() {
  var offset = 50;
  return {
    left: fabric.util.getRandomInt(0 + offset, 700 - offset),
    top: fabric.util.getRandomInt(0 + offset, 500 - offset)
  };
}


function useCoreHandler() {
  const { canvas, activeObject } = useCanvasContext()

  // Add objects to canvas
  const addObject = useCallback(
    options => {
      const { type, ...textOptions } = options
      const element = CanvasObjects[type].render(textOptions)
      //@ts-ignore
      const workarea = canvas.getObjects().find(obj => obj.id === 'workarea')
      canvas.add(element)
      element.center()

      element.clipPath = workarea
      canvas.renderAll()
    },
    [canvas]
  )

  // Update properties, optional set metadata if present
  const setProperty = useCallback(
    (property, value) => {
      if (activeObject) {
        activeObject.set(property, value)
        activeObject.setCoords()
        canvas.requestRenderAll()
      }
    },
    [activeObject, canvas]
  )

  const exportJSON = useCallback(() => {
    const json = canvas.toJSON(propertiesToInclude)
    return json
  }, [canvas])

  const loadJSON = useCallback(
    json => {
      if (canvas) {
        canvas.loadFromJSON(json, () => {
          canvas.requestRenderAll()
        })
      }
    },
    [canvas]
  )

  const setCanvasBackgroundColor = useCallback(
    color => {
      // @ts-ignore
      const workarea = canvas.getObjects().find(object => object.id === 'workarea')
      if (workarea) {
        workarea.set('fill', color)
        canvas.requestRenderAll()
      }
    },
    [canvas]
  )

  // const addImage = useCallback(
  //   options => {
  //     CanvasObjects.image.render(options, function (oImg) {
  //       oImg.scale(0.09).set('flipX', true);
  //       canvas.add(oImg);
  //     })
  //   },
  //   [canvas]
  // )

  function addImage(imageName, minScale, maxScale) {
    var coord = getRandomLeftTop();


    fabric.Image.fromURL(imageName, function (image) {

      image.set({
        left: coord.left,
        top: coord.top,
        angle: getRandomInt(-10, 10),
      })
        .scale(getRandomNum(minScale, maxScale))
        .setCoords();

      canvas.add(image);
    }, { crossOrigin: 'anonymous' });
  };

  const removeObject = useCallback(
    options => {
      var activeObj = canvas.getActiveObject();
      canvas.remove(activeObj);
      canvas.renderAll();
    },
    [canvas]
  )

  return { exportJSON, loadJSON, setCanvasBackgroundColor, addObject, setProperty, addImage, removeObject }
}

export default useCoreHandler
