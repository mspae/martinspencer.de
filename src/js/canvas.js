  const createContext = require('2d-context')
  const createLoop = require('canvas-loop')

  function Gradient(options) {
    this.options = options
  }


  Gradient.prototype.tick = function(time, ctx, width, height) {


    const gradient = ctx.createRadialGradient(this.options.x0, this.options.y0, this.options.r0, this.options.x1, this.options.y1, this.options.r1)
    Object.keys(this.options.colorStops).forEach((stop) => {
      gradient.addColorStop(stop, this.options.colorStops[stop])
    })
    ctx.fillStyle = gradient

    ctx.fillRect(0, 0, width, height)
    return this
  }



  export default function() {

    // get a WebGL context
    const ctx = createContext()
    const canvas = ctx.canvas
    canvas.setAttribute('id', 'background')
    document.body.appendChild(canvas)


    // setup a retina-scaled canvas
    const app = createLoop(canvas, {
      scale: window.devicePixelRatio
    })



    app.start()

    let gradients = []
    const maxGradients = 5
    let time = 0
    app.on('tick', function(dt) {

      time += dt / 1000

      const [width, height] = app.shape
      ctx.save()
      ctx.scale(app.scale, app.scale)
      ctx.clearRect(0, 0, width, height)

      gradients.map((gradient) => {
        gradient.tick(time, ctx, width, height)
      })
      ctx.restore()

      if (gradients.length < maxGradients) {
        gradients.push(new Gradient({
          x0: 100,
          y0: 100,
          r0: 100,
          x1: 100,
          y1: 100,
          r1: 0,
          colorStops: {
            1: 'rgba(255,255,255,0)',
            0: '#F3C2C9'
          }
        }))
      }
    })

    // handle window resize
    app.on('resize', function() {
      // the unscaled size
      var width = app.shape[0]
      var height = app.shape[1]
    })
  }