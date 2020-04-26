import { shiftGroup } from './../elements/Groups.js'
import { isValidFormat, isInRange } from '../utils/Validators.js'
import { toDate, toDateString } from '../utils/Transformers.js'
import { getElementById, getFocussedElement, isDay, isSwitcher, on } from '../dom/Dom.js'
import { createDateFromArray } from './../utils/DateManipulation.js'
import { rootKeyBindings } from '../logic/KeyConfig.js'
import { redrawCalendar, removeCalendar } from '../draw/Draw.js'
import { createDateFromDayEl } from '../utils/Transformers.js'

function Listeners (config, setState, getState) {

    this.setListeners = function setListeners (rootEl, inputEl) {
        var focus = on('focus', inputEl, openDatepicker)
        var click = on('click', rootEl, clickSwitch)
        var keydown = on('keydown', rootEl, keyPressSwitch)
        var input = on('input', inputEl, updateDatePicker)
        var inputClick = on('click', inputEl, openDatepicker)
        var blur = on('focusout', inputEl, closeDatePicker)
        var mousedown = on('mousedown', rootEl, preventBlur)
    }

    function preventBlur (e) {
        if (e.target.hasAttribute('data-direction')) {
            e.preventDefault()
        }
    }

    function updateDatePicker (e) {
        var el = e.target
        var dateCandidate = isValidFormat(el.value, config.dateFormat)
            && isInRange(el.value, config.minDate, config.maxDate, config.dateFormat)
            && toDate(el.value, config.dateFormat)
        
        if (dateCandidate) {
            setState('selectedDate', dateCandidate)
            getElementById('group' + config.id) && redrawCalendar(el.parentNode, getState('selectedDate'), config)
            el.setCustomValidity('')
        } else {
            el.setCustomValidity('invalid date')
        }
    }
    
    function closeDatePicker (e) {
        if (!e.relatedTarget || !e.relatedTarget.getAttribute('data-ad-id')) {
            removeCalendar(e.currentTarget.parentNode, config.id)
        }
    }

    function openDatepicker (e) {
        if ((e.target.value === '' || e.type === 'click') && !getElementById(config.id + 'group')) {
            var el = e.target.parentNode
            var date = getState('selectedDate') || (config.initialDate && toDate(config.initialDate, config.dateFormat)) || new Date()
            redrawCalendar(el, date, config)
            getElementById(config.id + 'group').scrollIntoView()
        }
    }
    
    function selectDate (target, inputEl) {
        var date = createDateFromDayEl(target)
        if (isInRange(date, config.minDate, config.maxDate, config.dateFormat)) {
            inputEl.value = toDateString(date, config.dateFormat)
            setState('selectedDate', date)
            removeCalendar(inputEl.parentNode, config.id)
            inputEl.setCustomValidity('')
            inputEl.focus()
            emitInputEvent(inputEl)
        }
    }

    function emitInputEvent (target) {
        var e = new Event('input', { bubbles: true })
        target.dispatchEvent(e)
    }

    function triggerSwitch(e) {
        var root = e.currentTarget
        var dir = parseInt(e.target.getAttribute('data-ad-id'))
        var date = e.target.value.split('$')
        date = createDateFromArray([date[0], date[1], 1])
        var newGroup = shiftGroup(date, dir, config)
        redrawCalendar(root, newGroup.date, config, newGroup.before, newGroup.after)
    }
    
    function clickSwitch (e) {
        var el = e.target
        var inputEl = getElementById(config.id + 'input')
        isDay(el) && selectDate(el, inputEl)
        isSwitcher(el) && triggerSwitch(e)
    }
    
    function keyPressSwitch (e) {
        var evtSource = isDay(getFocussedElement()) ? 'day' : null
        var key = e.shiftKey ? e.which + 'shift' : e.which
        rootKeyBindings[key] && rootKeyBindings[key](e, evtSource, config, getState('selectedDate'))
    }
}


export { Listeners }