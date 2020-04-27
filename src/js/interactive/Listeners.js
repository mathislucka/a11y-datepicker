import { shiftGroup } from './../elements/Groups.js'
import { isValidFormat, isInRange } from '../utils/Validators.js'
import { toDate, toDateString } from '../utils/Transformers.js'
import { getElementById, getFocussedElement, isDay, isSwitcher, on, emitEvent } from '../dom/Dom.js'
import { createDateFromArray } from './../utils/DateManipulation.js'
import { rootKeyBindings } from '../logic/KeyConfig.js'
import { redrawCalendar, removeCalendar } from '../draw/Draw.js'
import { createDateFromDayEl } from '../utils/Transformers.js'

function Listeners (config, setDate, getDate) {

    this.setListeners = function setListeners (rootEl, inputEl) {
        on('focus', inputEl, openDatepicker)
        on('click', rootEl, clickSwitch)
        on('keydown', rootEl, keyPressSwitch)
        on('input', inputEl, updateDatePicker)
        on('click', inputEl, openDatepicker)
        on('focusout', inputEl, closeDatePicker)
        on('mousedown', rootEl, preventBlur)
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
            setDate(dateCandidate)
            getElementById('group' + config.id) && redrawCalendar(el.parentNode, getDate(), config)
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
            var date = getDate() || (config.initialDate && toDate(config.initialDate, config.dateFormat)) || new Date()
            redrawCalendar(el, date, config)
            getElementById(config.id + 'group').scrollIntoView()
        }
    }
    
    function selectDate (target, inputEl) {
        var date = createDateFromDayEl(target)
        if (isInRange(date, config.minDate, config.maxDate, config.dateFormat)) {
            inputEl.value = toDateString(date, config.dateFormat)
            setDate(date)
            removeCalendar(inputEl.parentNode, config.id)
            inputEl.setCustomValidity('')
            inputEl.focus()
            emitEvent(inputEl, 'input')
        }
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
        rootKeyBindings[key] && rootKeyBindings[key](e, evtSource, config, getDate())
    }
}


export { Listeners }