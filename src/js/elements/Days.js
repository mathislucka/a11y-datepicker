import { createDateFromArray } from '../utils/DateManipulation.js'

function createButton(day, month, year, localMonth, weekday, isEnabled) {
    var btn = document.createElement('button')
    var txt = document.createTextNode(day)
    btn.value = year +'$' + month + '$' + day
    btn.type = 'button'
    btn.setAttribute('data-day', true)
    btn.setAttribute('data-ad-id', '' + day + month + year)
    btn.setAttribute('aria-label', weekday + ' ' + day + ' ' + localMonth + ' ' + year)
    btn.setAttribute('aria-disabled', !isEnabled)
    btn.appendChild(txt)
    return btn
}

function configureDays (month, year, localMonth, rangeChecker) {
    return function (day, weekday) {
        var cell = document.createElement('td')
        var date = createDateFromArray([year, month, day])
        cell.appendChild(createButton(day, month, year, localMonth, weekday, rangeChecker(date)))
        return cell
    }
}

export { configureDays }