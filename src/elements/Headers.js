import { createSwitcher } from './Controls.js'

function createPrimaryHeader(year, month, monthString, isLeftEdge, isRightEdge) {
    var header = document.createElement('tr')
    var headerContent = document.createElement('th')
    var colSpan = (isLeftEdge && isRightEdge && 5) || ((isLeftEdge || isRightEdge) && 6) || 7 
    headerContent.colSpan = colSpan
    headerContent.appendChild(document.createTextNode(monthString + ' ' + year))

    if (isLeftEdge) {
        var prev = createSwitcher('-1', year, month)
        header.appendChild(prev)
    }

    header.appendChild(headerContent)
   
    if (isRightEdge) {
        var next = createSwitcher('1', year, month)
        header.appendChild(next)
    }

    return header
}

function createSecondaryHeader(days) {
    var header = document.createElement('tr')

    days.forEach( function (day) {
        var text = document.createTextNode(day)
        var dayEl = document.createElement('th')
        dayEl.appendChild(text)
        header.appendChild(dayEl)
    })

    return header
}

export { createPrimaryHeader, createSecondaryHeader }

