import { createDateFromArray } from "./DateManipulation.js"

function createFormatMapping (format, separator) {
    var dateFormat = format.split(separator)
    dateFormat.forEach(function (d, idx) {
        if (d.indexOf('d') > -1) dateFormat[idx] = 'day'
        if (d.indexOf('m') > -1) dateFormat[idx] = 'month'
        if (d.indexOf('y') > -1) dateFormat[idx] = 'year'
    })
    return dateFormat
}

function datePart (dateFormat) {
    return function (date, part) {
        return date[dateFormat.indexOf(part)]
    }
}

function findSeparator (format) {
    var separator
    if (format.indexOf('.') > -1) separator = '.'
    if (format.indexOf('-') > -1) separator = '-'
    if (format.indexOf('/') > -1) separator = '/'
    return separator
}

function toDate (date, format) {
    var separator = findSeparator(format)
    var mapping = createFormatMapping(format, separator)
    var newDate = date.split(separator)
    var f = datePart(mapping)
    return new Date(f(newDate, 'year'), f(newDate, 'month') - 1, f(newDate, 'day'))
}

function toDateString (date, format) {
    var separator = findSeparator(format)
    var dateFormat = format.split(separator)
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var splitDate = dateFormat.map(function (f) {
        if (f.match(/d/i)) return leftPadDate(day, f)
        if (f.match(/m/i)) return leftPadDate(month, f)
        if (f.match(/y/i)) return leftPadDate(year, f)
    })
    
    return splitDate.join(separator) 
}

function leftPadDate (date, dateFormat) {
    var diff = (dateFormat + '').length - (date + '').length
    if (diff === 0) return date
    if (diff > 0) return addZeros(date, diff)
    if (diff < 0) throw new Error('Invalid date format')
}

function addZeros (int, n) {
    var out = int + ''
    for (var i = 0; i < n; i++) {
        out = 0 + out
    }
    return out
}

function createDateFromDayEl (el) {
    return createDateFromArray(el.value.split('$').map(function (d) { return parseInt(d) }))
}

export { createDateFromDayEl, createFormatMapping, datePart, findSeparator, toDate, toDateString }