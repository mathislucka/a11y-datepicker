import { createRange } from '../utils/Range.js'
import { createMonth } from './Months.js'
import { shiftMonth } from '../utils/DateManipulation.js'
import { getElementById, removeAllChildren } from './../dom/Dom.js'

function renderGroup(el, date, config, before, after) {
    var container = getElementById(config.id + 'group-container')
    var group = getElementById(config.id + 'group')
    group = group && container && container.removeChild(group)
    container = container || document.createElement('div')
    group = group || document.createElement('div')
    group = removeAllChildren(group)
    
    var range = createRange(before, after)
    range.forEach( function (r, idx) {
        var isLeftEdge = typeof range[idx - 1] === 'undefined'
        var isRightEdge = typeof range[idx + 1] === 'undefined'
        var currentDate = shiftMonth(date, r)
        group.appendChild(createMonth(currentDate, isLeftEdge, isRightEdge, config))
    })

    group.setAttribute('data-ad-id', config.id + 'group')
    group.setAttribute('data-ad-selector', 'datepicker-container')
    
    container.setAttribute('data-ad-selector', 'group-container')
    container.setAttribute('data-ad-id', config.id + 'group-container')
    container.appendChild(group)
    el.appendChild(container)
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