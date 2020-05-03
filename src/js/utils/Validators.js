import { createFormatMapping, datePart, findSeparator, toDate } from './Transformers.js'

function isValidFormat (dateString, format) {
    var separator = findSeparator(format)
    var dateFormat = createFormatMapping(format, separator)

    var f = datePart(dateFormat)

    var date = dateString.split(separator)
    date = date.map(function (d) { return parseInt(d) })
    if (date.length !== 3) return false
    if (f(date, 'month') > 12 || f(date, 'month') < 1) return false
    var test = new Date(f(date, 'year'), f(date, 'month') - 1, f(date, 'day'))
    if(!isValidDate(test)) return false
    return true
}

function isValidDate(date) {
    return date instanceof Date && !isNaN(date);
}

function isInRange (date, min, max, format) {
    var mi = min && ((isValidDate(min) && min) ||  toDate(min, format))
    var ma = max && ((isValidDate(max) && max) ||  toDate(max, format))
    var d = (isValidDate(date) && date) ||  toDate(date, format)

    return (!mi || mi <= d) && (!ma || ma >= d)
}

export { isValidDate, isValidFormat, isInRange }