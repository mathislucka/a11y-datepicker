import { renderGroup } from "../elements/Groups"
import { setClasses, addClass, getElementById } from '../dom/Dom.js'
import { toDate, toDateString } from '../utils/Transformers.js'

function redrawCalendar (calendarRootElement, drawingDate, config, before, after) {
    before = isNaN(before) ? config.monthsBeforeCurrent : before
    after = isNaN(after) ? config.monthsAfterCurrent : after
    removeCalendar(calendarRootElement, config.id)
    renderGroup(calendarRootElement, drawingDate, config, before, after)
    setClasses(calendarRootElement, config.classPrefix)
}

function removeCalendar (calendarRootElement, id) {
    var calendarContainer = getElementById(id + 'group-container')
    calendarContainer && calendarRootElement.removeChild(calendarContainer)
}

function drawDateInput (calendarRootElement, config) {
    var description = document.createElement('p')
    description.appendChild(document.createTextNode(config.translations.description))
    description.classList.add('visuallyhidden')
    description.id = config.id + 'description'
    calendarRootElement.appendChild(description)

    var dateInput = document.createElement('input')
    dateInput.setAttribute('aria-describedby', config.id + 'description')
    dateInput.type = 'text'
    dateInput.setAttribute('data-ad-id', config.id + 'input')
    dateInput.setAttribute('name', config.inputName)
    config.required && dateInput.setAttribute('required', true)
    dateInput = addClass(dateInput, config.inputClass)
    calendarRootElement.appendChild(dateInput)
    setClasses(calendarRootElement, config.classPrefix)
    return dateInput
}

function drawMobileDateInput (calendarRootElement, config) {
    var input = document.createElement('input')
    input.type = 'date'
    config.maxDate && setDateBound(input, 'max', config.maxDate, config.dateFormat)
    config.minDate && setDateBound(input, 'min', config.minDate, config.dateFormat)
    calendarRootElement.appendChild(input)
}

function setDateBound(el, type, date, dateFormat) {
    var bound = toDate(date, dateFormat)
    max = toDateString(bound, 'yyyy-mm-dd')
    el.setAttribute(type, bound) 
}

export { drawDateInput, drawMobileDateInput, redrawCalendar, removeCalendar }