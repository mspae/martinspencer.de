const classNames = require('classnames')
// const underline = require('underlinejs')
// const canvas = require('./canvas').default
// const Shading = require('./shading')

;(function () {
  window.addEventListener('load', initialise)
  let shading = null

  function initialise () {
    registerModals()
    emailLinks()
  // canvas()
  // if (!shading) shading = new Shading()
  }

  function emailLinks () {
    const email = rot13('znvy@znegvafcrapre.qr')

    function rot13 (cypher) {
      return cypher.replace(/[a-zA-Z]/g, function (e) {
        return String.fromCharCode((e <= 'Z' ? 90 : 122) >= (e = e.charCodeAt(0) + 13) ? e : e - 26)
      })
    }

    ;[].forEach.call(document.querySelectorAll('.email-link'), (wrapper) => {
      const link = document.createElement('a')
      link.href = 'mailto:' + email
      link.innerHTML = email
      wrapper.parentNode.replaceChild(link, wrapper)
    })
  }

  function registerModals () {
    const body = document.getElementsByTagName('body')[0]
    const modalLinks = document.querySelectorAll('.modal-link')
    const closeLinks = document.querySelectorAll('.modal-close')
    const modals = document.querySelectorAll('.modal')

    ;[].forEach.call(modalLinks, (link) => {
      const modalId = link.getAttribute('href').substr(1)

      link.addEventListener('click', (e) => {
        ;[].forEach.call(modals, (modal) => {
          const classes = {
            modal: true,
            'active-modal': modal.getAttribute('id') === modalId
          }
          modal.setAttribute('class', classNames(classes))
        })
        e.preventDefault()
      })
    })

    ;[].forEach.call(closeLinks, (link) => {
      link.addEventListener('click', (e) => {
        const classes = {
          modal: true
        }
        ;[].forEach.call(modals, (modal) => {
          modal.setAttribute('class', classNames(classes))
        })
        e.preventDefault()
      })
    })
  }
})()
