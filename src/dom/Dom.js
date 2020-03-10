import { createDateFromDayEl } from '../utils/Transformers.js'

function focusElement (el) {
    el.focus()
    return true
}

function getFocussedElement () {
    return document.activeElement
}

function getElementById (id) {
    return document.querySelector('[data-ad-id="' + id + '"]')
}

function getElementByDate (date) {
    return getElementById('' + date.getDate() + date.getMonth() + date.getFullYear())
}

function getFocussedDay () {
    return createDateFromDayEl(getFocussedElement())
}

function on (evt, el, handler) {
    el.addEventListener(evt, handler, true)
  
    return function () {
      el.removeEventListener(evt, handler, true);
    }
}

function isDay (el) {
    return el.hasAttribute('data-day')
}

function isSwitcher (el) {
    return el.hasAttribute('data-direction')
}

export { focusElement, getElementById, getElementByDate, getFocussedElement, on, isDay, isSwitcher, getFocussedDay }