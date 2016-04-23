(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
		// register as 'classnames', consistent with npm package name
		define('classnames', [], function () {
			return classNames;
		});
	} else {
		window.classNames = classNames;
	}
}());

},{}],2:[function(require,module,exports){
'use strict';

var classNames = require('classnames')
//const underline = require('underlinejs')
//const canvas = require('./canvas').default
//const Shading = require('./shading')

;(function () {
  window.addEventListener('load', initialise);
  var shading = null;

  function initialise() {
    registerModals();
    emailLinks();
    //canvas()
    //if (!shading) shading = new Shading()
  }

  function emailLinks() {
    var email = rot13('znvy@znegvafcrapre.qr');

    function rot13(cypher) {
      return cypher.replace(/[a-zA-Z]/g, function (e) {
        return String.fromCharCode((e <= 'Z' ? 90 : 122) >= (e = e.charCodeAt(0) + 13) ? e : e - 26);
      });
    }

    ;[].forEach.call(document.querySelectorAll('.email-link'), function (wrapper) {
      var link = document.createElement('a');
      link.href = 'mailto:' + email;
      link.innerHTML = email;
      wrapper.parentNode.replaceChild(link, wrapper);
    });
  }

  function registerModals() {
    var body = document.getElementsByTagName('body')[0];
    var modalLinks = document.querySelectorAll('.modal-link');
    var closeLinks = document.querySelectorAll('.modal-close');
    var modals = document.querySelectorAll('.modal');[].forEach.call(modalLinks, function (link) {
      var modalId = link.getAttribute('href').substr(1);

      link.addEventListener('click', function (e) {
        ;[].forEach.call(modals, function (modal) {
          var classes = {
            modal: true,
            'active-modal': modal.getAttribute('id') === modalId
          };
          modal.setAttribute('class', classNames(classes));
        });
        e.preventDefault();
      });
    });[].forEach.call(closeLinks, function (link) {
      link.addEventListener('click', function (e) {
        var classes = {
          modal: true
        };[].forEach.call(modals, function (modal) {
          modal.setAttribute('class', classNames(classes));
        });
        e.preventDefault();
      });
    });
  }
})();

},{"classnames":1}]},{},[2])


//# sourceMappingURL=bundle.js.map
