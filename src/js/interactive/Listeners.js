import { shiftGroup } from './../elements/Groups.js'
import { isValidFormat, isInRange } from '../utils/Validators.js'
import { toDate, toDateString } from '../utils/Transformers.js'
import { focusElement, getElementById, getFocussedElement, isDay, isSwitcher, on, emitEvent } from '../dom/Dom.js'
import { createDateFromArray } from './../utils/DateManipulation.js'
import { keyBindings } from '../logic/KeyConfig.js'
import { redrawCalendar, removeCalendar } from '../draw/Draw.js'
import { createDateFromDayEl } from '../utils/Transformers.js'
import { switchDateFocus, focusCurrentDay } from '../logic/CalendarChanges.js'

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
        setDate(e.target.value, true)
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
            var calendar = getElementById(config.id + 'group')
            var bounding = calendar.getBoundingClientRect()
            if (bounding.bottom > (window.innerHeight || document.documentElement.clientHeight)) {
                calendar.scrollIntoView()
            }
        }
    }
    
    function selectDate (target, inputEl) {
        var date = createDateFromDayEl(target)
        if (setDate(date)) {
            removeCalendar(inputEl.parentNode, config.id)
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
        var isDayFocussed = isDay(getFocussedElement())
        var key = e.key
        var dateChange = keyBindings[key]
        if (e.shiftKey && (key === 'Down' || key === 'ArrowDown')) {
            focusCurrentDay(e.currentTarget, config, getDate())
        } else if (dateChange && isDayFocussed) {
            switchDateFocus(dateChange, e.currentTarget, config)
        } else if (key === 'Esc' || key === 'Escape') {
            focusElement(getElementById(config.id + 'input'))
            removeCalendar(e.currentTarget, config.id)
        }
    }
}


export { Listeners }