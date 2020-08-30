import { isValidDate, isValidFormat, isInRange } from '../utils/Validators.js'
import { toDate, toDateString } from '../utils/Transformers.js'

function dateSetter (state, dateInputEl, config) {
    var format = config.dateFormat
    return function (date, skipValidation, noValue) {
        var dateCandidate = (isValidDate(date) && date) || (isValidFormat(date, format) && toDate(date, format))
        if (dateCandidate && (isInRange(dateCandidate, config.minDate, config.maxDate, format) || skipValidation)) {
            if (!noValue) dateInputEl.value = toDateString(dateCandidate, format)
            dateInputEl.setCustomValidity('')
            state.selectedDate = dateCandidate
            return true
        } else {
            state.selectedDate = null
            var shouldValidate = date !== '' || (config.required && !skipValidation)
            shouldValidate && dateInputEl.setCustomValidity('invalid date')
            return false
        }
    }
}

function dateGetter (state, format, asString) {
    return function () {
        var date = state.selectedDate
        var out = date ? date : ''
        return asString && out !== '' ? toDateString(date, format) : out
    }
}

export { dateGetter, dateSetter }
