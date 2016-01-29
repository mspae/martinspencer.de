const assign = require('lodash/assign')
const classNames = require('classnames')

;(function () {
  class Gradient {
    constructor (options, canvas) {
      this.canvas = canvas
      this.x0 = 100
      this.y0 = 100
      this.r0 = 100
      this.x1 = 100
      this.y1 = 100
      this.r1 = 0

      this.render()
    }
    step () {
      this.render()
    }
    render () {
      const ctx = this.canvas.getContext('2d')
      ctx.beginPath()
      this.gradient = ctx.createRadialGradient(this.x0, this.y0, this.r0, this.x1, this.y1, this.r1)
      this.gradient.addColorStop(0, 'white')
      this.gradient.addColorStop(1, 'green')
      ctx.fillStyle = this.gradient
      ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }
  }

  class Background {
    constructor (options) {
      this.options = assign({}, {
        background: 'blue'
      }, options)

      this.canvas = document.getElementById('background')
      this.context = this.canvas.getContext('2d')
      this.gradients = []
      window.onresize = this.resize
      this.resize()
      this.render()
    }
    render () {
      const ctx = this.canvas.getContext('2d')

      ctx.beginPath()
      ctx.rect(0, 0, this.canvas.width, this.canvas.height)
      ctx.fillStyle = this.options.background
      ctx.fill()
      const gradient = new Gradient(null, this.canvas)

      window.requestAnimationFrame(this.render.bind(this))
    }
    resize() {
      this.canvas.height = window.innerHeight
      this.canvas.width = window.innerWidth
    }
  }

/*const bg = new Background({
  background: 'red'
})*/
})()

;(function () {
  window.addEventListener('load', initialise)

  function initialise () {
    registerModals()
  }

  function registerModals () {
    const modalLinks = document.querySelectorAll('.modal-link')
    const closeLinks = document.querySelectorAll('.modal-close')
    const modals = document.querySelectorAll('.modal')

    ;[].forEach.call(modalLinks, (link) => {
      console.log(link)
      const modalId = link.getAttribute('href').substr(1)

      link.addEventListener('click', () => {
        ;[].forEach.call(modals, (modal) => {
          const classes = {
            modal: true,
            'active-modal': modal.getAttribute('id') === modalId
          }
          modal.setAttribute('class', classNames(classes))
        })
      })
    })

    ;[].forEach.call(closeLinks, (link) => {
      link.addEventListener('click', () => {
        const classes = {
          modal: true
        }
        ;[].forEach.call(modals, (modal) => {
          modal.setAttribute('class', classNames(classes))
        })
      })
    })
  }
})()
