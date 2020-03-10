import { createPrimaryHeader, createSecondaryHeader } from './Headers.js'
import { configureDays } from './Days.js'
import { createRows, createFirstRow } from './Rows.js'
import { getCurrentDayOfWeek, createDateFromArray } from '../utils/DateManipulation.js'
import { isInRange } from '../utils/Validators.js'

function createMonth(date, isLeftEdge, isRightEdge, config) {
    var year = date.getFullYear()
    var month = date.getMonth()
    var monthString = date.toLocaleDateString(config.locale, { month: 'long' })
    var start = getCurrentDayOfWeek(date, config.weekStartsOn)
    var lastDay = createDateFromArray([year, month + 1, 0]).getDate()

    var rangeChecker = (function (minDate, maxDate, format) {
        return function (date) {
            return isInRange(date, minDate, maxDate, format)
        }
    })(config.minDate, config.maxDate, config.dateFormat)

    var dayFunc = configureDays(month, year, monthString, rangeChecker)

    var table = document.createElement('table')
    var head = document.createElement('thead')
    head.appendChild(createPrimaryHeader(year, month, monthString, isLeftEdge, isRightEdge))
    head.appendChild(createSecondaryHeader(config.weekdays))
    table.appendChild(head)
    var firstRow = createFirstRow(start, dayFunc, config)
    table.appendChild(firstRow.el)
    table.appendChild(createRows(firstRow.end, lastDay, dayFunc, config))

    return table
}

export { createMonth }