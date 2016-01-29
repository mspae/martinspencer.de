const assign = require('lodash/assign')

;(function () {
  class Gradient {
    constructor(options, canvas) {
      this.canvas = canvas
      this.x0 = 100
      this.y0 = 100
      this.r0 = 100
      this.x1 = 100
      this.y1 = 100
      this.r1 = 0

      this.render()
    }
    step() {
      this.render()
    }
    render() {
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
    constructor(options) {
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
    render() {
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
    const links = [].concat(document.querySelector('.modal-link'))
    const modals = [].concat(document.querySelector('.modal'))

    links.forEach((link) => {
      const modal = document.getElementById(link.getAttribute('href').substr(1))

      link.addEventListener('click', () => {
        modals.forEach((modal) => {
          removeClassName(modal, 'active-modal')
        })
        setClassNames(modal, getClassNames(modal).concat('active-modal'))
      })
    })
  }
})()

function removeClassName (el, classname) {
  const classnames = getClassNames(el)
  for (const i = classnames.length - 1; i >= 0; i--) {
    if (classnames[i] === classname) {
      classnames.splice(i, 1)
    }
  }
  setClassNames(el, classnames)
}

function addClassName (el, classname) {
  setClassNames(el, getClassNames(el).concat(classname))
}

function getClassNames (el) {
  return el.getAttribute('class').trim().split(' ')
}

function setClassNames (el, classnames) {
  return el.setAttribute('class', classnames.join(' '))
}
