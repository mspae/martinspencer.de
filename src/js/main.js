const classNames = require('classnames')

;(function () {
  window.addEventListener('load', initialise)

  function initialise () {
    registerModals()
    emailLinks()
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
        const bodyClasses = {
          'active-modal': true
        }
        ;[].forEach.call(modals, (modal) => {
          const classes = {
            modal: true,
            'active-modal': modal.getAttribute('id') === modalId
          }
          modal.setAttribute('class', classNames(classes))
        })
        body.setAttribute('class', classNames(bodyClasses))
        e.preventDefault()
      })
    })

    ;[].forEach.call(closeLinks, (link) => {
      link.addEventListener('click', (e) => {
        const classes = {
          modal: true
        }
        const bodyClasses = {
          'active-modal': false
        }
        ;[].forEach.call(modals, (modal) => {
          modal.setAttribute('class', classNames(classes))
        })

        body.setAttribute('class', classNames(bodyClasses))
        e.preventDefault()
      })
    })
  }
})()
