import { createDateFromDayEl } from '../utils/Transformers.js'

function addClass (el, classString) {
    if (classString.length === 0) return el
    var classes = classString.split(' ')
    var i = 0
    while (i < classes.length) {
        el.classList.add(classes[i])
        i += 1
    }
    return el
}

function addTagClass (el, classString) {
    var tag  = el.tagName.toLowerCase()
    el.classList.add(classString + tag)
}

function setClasses (rootEl, classString) {
    var children = Array.prototype.slice.call(rootEl.getElementsByTagName('*'))
    var i = 0
    while (i < children.length) {
        addTagClass(children[i], classString)
        i += 1
    }
}

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
      };
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

export { addClass, emitEvent, focusElement, getElementById, getElementByDate, getFocussedElement, on, isDay, isSwitcher, getFocussedDay, setClasses }