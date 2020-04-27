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
}

function isDay (el) {
    return el.hasAttribute('data-day')
}

function isSwitcher (el) {
    var dir =  el.getAttribute('data-ad-id')
    return dir === '1' || dir === '-1'
}

function emitEvent (target, type) {
    var e = new Event(type, { bubbles: true })
    target.dispatchEvent(e)
}

export { emitEvent, focusElement, getElementById, getElementByDate, getFocussedElement, on, isDay, isSwitcher, getFocussedDay }