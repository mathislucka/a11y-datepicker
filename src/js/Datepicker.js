import { findFirstDay, getWeekdays } from './utils/DateManipulation.js'
import { Listeners } from './interactive/Listeners.js'
import { merge } from './utils/Merge.js'
import { drawDateInput, drawMobileDateInput } from './draw/Draw.js'
import { isMobileDevice } from './utils/DetectMobile.js'

var defaultConfig = {
    locale: 'en-EN',
    weekDayFormat: 'short',
    minDate: null,
    maxDate: null,
    initialDate: null,
    monthsBeforeCurrent: 0,
    monthsAfterCurrent: 0,
    weekStartsOn: 1,
    id: '_ad-',
    dateFormat: 'yyyy-mm-dd',
    inputName: 'datepicker-input',
    theme: 'dark'
}

var defaultTranslations = {
    description: 'This is a datepicker. You can type in a date using the keyboard. Use the required date format. It should be:' +
        defaultConfig.dateFormat + ' You can also use the datepicker to select a date.' +
        ' Press shift and arrow down to focus the datepicker.' +
        ' Press left arrow to move one day back.' +
        ' Press right arrow to move one day ahead.' +
        ' Press arrow up to move one week back. ' +
        ' Press arrow down to move one week ahead' +
        ' Press Space to select a date.' +
        ' Press Escape to close the datepicker.',
    notInRange: 'The date is not within the intended date range.',
    nextGroups: 'Show next months.',
    prevGroups: 'Show previous months.',
}

function Datepicker(userConfig, userTranslations) {
    
    var state = { selectedDate: null }
    var setDate = function (value) { state.selectedDate = value }
    var getDate = function () { return state.selectedDate }

    function initialize (userConfig, userTranslations, setDate, getDate) {
        
        var config = merge(defaultConfig, userConfig || {})
        config.translations = merge(defaultTranslations, userTranslations || {})
        config.monthsBeforeCurrent = config.monthsBeforeCurrent * -1
        config.weekdays = getWeekdays(findFirstDay(config.weekStartsOn), config.locale, config.weekDayFormat)
        var calendarRootElement = document.getElementById(config.id)
        calendarRootElement.classList.add(config.theme)
        
        if (!isMobileDevice()) {
            var inputEl = drawDateInput(calendarRootElement, config)
            var listeners = new Listeners(config, setDate, getDate)
            listeners.setListeners(calendarRootElement, inputEl)
        } else {
            drawMobileDateInput(calendarRootElement, config)
        }
    }

    initialize(userConfig, userTranslations, setDate, getDate)
}

export { Datepicker }