import { findFirstDay, getWeekdays } from './utils/DateManipulation.js'
import { Listeners } from './interactive/Listeners.js'
import { merge } from './utils/Merge.js'
import { drawDateInput, drawMobileDateInput } from './draw/Draw.js'
import { isMobileDevice } from './utils/DetectMobile.js'
import { dateSetter, dateGetter } from './logic/stateManipulation.js'
import { addClass, setClasses } from './dom/Dom.js'

var defaultTranslations = {
    description: 'This is a datepicker. You can type in a date using the keyboard. Use the required date format. It should be:' +
        'yyyy-mm-dd.' + ' You can also use the datepicker to select a date.' +
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

var defaultConfig = {
    locale: 'en-EN',
    weekDayFormat: 'short',
    minDate: null,
    maxDate: null,
    initialDate: null,
    monthsBeforeCurrent: 0,
    monthsAfterCurrent: 0,
    weekStartsOn: 1,
    id: 'a1-',
    dateFormat: 'yyyy-mm-dd',
    inputName: 'datepicker-input',
    inputClass: '',
    rootClass: '',
    classPrefix: 'a1-',
    translations: defaultTranslations,
    required: false,
    disabled: false,
    onAfterOpen: function (el) {}
}

function Datepicker(userConfig) {
    var state = {
        selectedDate: null,
        config: defaultConfig,
        listeners: null
    }

    function initializeConfig (userConfig) {
        state.config = merge(state.config, userConfig || {})
        var monthsBefore = state.config.monthsBeforeCurrent
        state.config.monthsBeforeCurrent = monthsBefore < 0 ? monthsBefore : (monthsBefore * -1)
        state.config.weekdays = getWeekdays(findFirstDay(state.config.weekStartsOn), state.config.locale, state.config.weekDayFormat)
    }

    function drawDatepicker (config) {
        var calendarRootElement = document.getElementById(config.id)
        addClass(calendarRootElement, config.rootClass)
        setClasses(calendarRootElement, config.classPrefix)
        var setDate, getDate, getDateAsString
        if (!isMobileDevice()) {
            var inputEl = drawDateInput(calendarRootElement, config)
            setDate = dateSetter(state, inputEl, config)
            getDate = dateGetter(state, config.dateFormat)
            getDateAsString = dateGetter(state, config.dateFormat, true)
            state.listeners = new Listeners(config, setDate, getDate)
            state.listeners.setListeners(calendarRootElement, inputEl)
        } else {
            drawMobileDateInput(calendarRootElement, config)
        }
        return {
            getConfig: function () { return state.config },
            setDate: setDate,
            getDate: getDate,
            getDateAsString: getDateAsString
        }
    }

    function removeListeners (listeners) {
        var i = 0
        while (i < listeners.length) { listeners[i](); i++ }
    }

    function destroy () {
        document.getElementById(state.config.id).innerHTML = ''
        state.listeners && removeListeners(state.listeners.activeListeners)

    }

    function update (newConfig) {
        initializeConfig(newConfig)
        destroy()
        var instance = drawDatepicker(state.config)
        state.selectedDate && instance.setDate(state.selectedDate)
        instance.updateDatepicker = update
        return instance
    } 

    return update(userConfig)
}

export { Datepicker }