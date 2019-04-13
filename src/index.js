import videoSrc from './171003D_017_2K.mp4'

const maxW = 1280
const maxH = 960

const chromakey = function chromakey(src) {
  const video = document.createElement('video')
  const canvasContainer = document.createElement('div')
  const c1 = document.createElement('canvas')
  const ctx1 = c1.getContext('2d')
  const c2 = document.createElement('canvas')
  const ctx2 = c2.getContext('2d')

  let width = 0,
    height = 0

  const load = () => {
    appendVideo()

    video.addEventListener('play', ev => {
      appendCanvas()
      loop()
    })

  }

  const loop = () => {
    if (video.paused || video.ended) return
    computeFrame()
    window.requestAnimationFrame(loop)
  }

  const computeFrame = () => {
    ctx1.drawImage(video, 0, 0, width, height)
    const frame = ctx1.getImageData(0, 0, width, height)
    const l = frame.data.length / 4

    for (let i = 0; i < l; i++) {
      let r = frame.data[i * 4 + 0];
      let g = frame.data[i * 4 + 1];
      let b = frame.data[i * 4 + 2];
      if (r < 120 && g > 100 && b < 80) {
        frame.data[i * 4 + 3] = 0;
      }
    }

    ctx2.putImageData(frame, 0, 0);
  }

  const appendVideo = () => {
    document.body.appendChild(video)
    window.requestAnimationFrame(() => configVideo())
  }

  const configVideo = () => {
    video.src = src
    video.controls = true

    let { width: vw, height: vh } = video.getBoundingClientRect()

    vw = vw > maxW ? maxW : vw
    vh = vh > maxH ? maxH : vw

    width = vw / 2
    height = vh / 2

    video.setAttribute('width', vw)
    video.setAttribute('height', vh)
  }

  const appendCanvas = () => {
    document.body.appendChild(c1)
    document.body.appendChild(c2)
    configCanvas()
  }

  const configCanvas = () => {
    [c1, c2].forEach((c) => {
      c.width = width
      c.height = height
      })
  }

  load()
}

document.addEventListener('DOMContentLoaded', () => chromakey(videoSrc))
