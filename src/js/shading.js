const _ = require('lodash')

_.mixin({
  uuid: function () {
    var now
    now = Date.now()
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r
      r = (now + Math.random() * 16) % 16 | 0
      now = Math.floor(now / 16)
      return (c === 'x' ? r : r & 0x7 | 0x8).toString(16)
    })
  }
})

function Shade (parent, options) {
  this.options = _.merge({}, options, {
  })
  this.el = (function () {
    const el = document.createElement('div')
    el.id = _.uuid()
    return parent.element.appendChild(el)
  })()

}

Shade.prototype.tick = function () {
  const { x, y, r, colorStops, cssPrefix } = this.options
  // this.el.style.webkitTransform = 'translate3d(' + this.options.x + ',' + this.options.y + ', 0)'
  // this.el.style.webkitTransform = `translate3d(${r} at ${x} ${y}, red 0%, blue 100%`
  // this.el.style.transform = 'translate3d(' + this.options.x + ',' + this.options.y + ', 0)'
  this.el.style.background = `${cssPrefix}radial-gradient(${r} at ${x} ${y}, ellipse contain, red 0%, blue 100%)`
}

function Shading () {
  this.maxShades = 10
  this.element = document.getElementById('background')
  this.progress = 0
  this.start = null
  this.shadesList = []
  this.cssPrefix = (() => {
    let result = ''
    let dom = document.createElement('div')
    const prefixes = ['-o-', '-ms-', '-moz-', '-webkit-']

    prefixes.forEach((prefix) => {
      dom.style.background = prefix + 'linear-gradient(#000000, #ffffff)'
      if (dom.style.background) {
        result = prefix
      }
    })

    dom = null
    return result
  })()

  window.requestAnimationFrame(this.step.bind(this))
}

Shading.prototype.addShade = function () {
  this.shadesList.push(new Shade(this, {
    x: '100px',
    y: '100px',
    r: '100px',
    colorStops: {
      1: 'rgba(255,255,255,0)',
      0: '#F3C2C9'
    },
    cssPrefix: this.cssPrefix
  }))
}

Shading.prototype.step = function () {
  if (this.start) this.start = this.timestamp
  this.progress = this.timestamp - this.start

  if (this.shadesList.length < this.maxShades) {
    this.addShade()
  }

  for (let shade of this.shadesList) {
    shade.tick(this.timestamp)
  }

  window.requestAnimationFrame(this.step.bind(this))
}

module.exports = Shading
