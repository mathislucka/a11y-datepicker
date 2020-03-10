import { createRange } from '../utils/Range.js'
import { createMonth } from './Months.js'
import { shiftMonth } from '../utils/DateManipulation.js'

function renderGroup(el, date, config, before, after) {
    var range = createRange(before, after)
    var group = document.createElement('div')

    range.forEach( function (r, idx) {
        var isLeftEdge = typeof range[idx - 1] === 'undefined'
        var isRightEdge = typeof range[idx + 1] === 'undefined'
        var currentDate = shiftMonth(date, r)
        group.appendChild(createMonth(currentDate, isLeftEdge, isRightEdge, config))
    })

    group.setAttribute('data-ad-id', config.id + 'group')
    el.appendChild(group)
}

function shiftGroup (date, direction, config) {
    var groupLen = createRange(config.monthsBeforeCurrent, config.monthsAfterCurrent).length
    var step = direction < 0 ? groupLen * -1 : groupLen
    var before = step < 0 ? 0 : groupLen - 1
    var after = step < 0 ? groupLen - 1 : 0

    return {
        date: shiftMonth(date, step),
        before: before * -1,
        after: after
    }
}

export { renderGroup, shiftGroup }