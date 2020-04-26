import { focusElement, getElementByDate, getFocussedDay } from "../dom/Dom.js"
import { shiftDate } from '../utils/DateManipulation.js'
import { shiftGroup } from '../elements/Groups.js'
import { redrawCalendar } from '../draw/Draw.js'
import { toDate } from '../utils/Transformers.js'

function renderMissingDate (el, dir, date, config) {
    var direction = dir > 0 ? 1 : -1
    var newGroup = shiftGroup(date, direction, config)
    redrawCalendar(el, newGroup.date, config, newGroup.before, newGroup.after)
    return true
}

function switchDateFocus (step, el, config) {
    var date = getFocussedDay()
    var newDate = shiftDate(date, step)
    var newDay = getElementByDate(newDate);
    (newDay && focusElement(newDay)) || (renderMissingDate(el, step, date, config) && focusElement(getElementByDate(newDate)))
}

function focusCurrentDay (el, config, state) {
    var date = state || (config.initialDate && toDate(config.initialDate, config.dateFormat)) || new Date() 
    redrawCalendar(el, date, config)
    focusElement(getElementByDate(date))
}

export { focusCurrentDay, switchDateFocus }