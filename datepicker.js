/**
 * Element creation and rendering
 */

function createButton(day) {
    let btn = document.createElement('button')
    let txt = document.createTextNode(day)
    btn.value = day
    btn.type = 'button'
    btn.setAttribute('data-day', day)
    btn.appendChild(txt)
    return btn
}

function createCell (day = null) {
    let cell = document.createElement('td')
    
    if (day !== null) {
        let btn = createButton(day)
        cell.appendChild(btn)
    }

    return cell
}

function createEmptyCells (n) {
    let fragment = document.createDocumentFragment()

    for (let i = 0; i < n; i++) {
       fragment.appendChild(createCell()) 
    }

    return fragment
}

function createFirstRow (start) {
    let counter = start
    let fragment = document.createDocumentFragment()
    let day = 1

    for(let i = counter; i < 7; i++) {
        fragment.appendChild(createCell(day))
        day += 1
    }
    
    let empties = createEmptyCells(start)
    let firstRow = document.createElement('tr')
    firstRow.appendChild(empties)
    firstRow.appendChild(fragment)
    return { el: firstRow, end: day }
}

function createMonth(date, weekdays, locale, weekDayFormat, groupId, isLeftEdge, isRightEdge) {
    const year = date.getFullYear()
    const month = date.getMonth()
    const monthString = date.toLocaleDateString(locale, { month: 'long' })
    const start = determineRenderStart(date, weekdays, locale, weekDayFormat)
    const lastDay = (new Date(year, month + 1, 0)).getDate()

    let table = document.createElement('table')
    table.appendChild(createPrimaryHeader(month, year, monthString, isLeftEdge, isRightEdge, groupId))
    table.appendChild(createSecondaryHeader(weekdays))
    let firstRow = createFirstRow(start)
    table.appendChild(firstRow.el)
    table.appendChild(createRows(firstRow.end, lastDay))
    table.id = 'ad-month'
    table.setAttribute('data-group', groupId)

    return table    
}

function createPrimaryHeader(month, year, monthString, isLeftEdge, isRightEdge, groupId) {
    let header = document.createElement('tr')
    let headerContent = document.createElement('th')
    let colSpan = (isLeftEdge && isRightEdge && 5) || ((isLeftEdge || isRightEdge) && 6) || 7 
    headerContent.colSpan = colSpan
    headerContent.appendChild(document.createTextNode(monthString + ' ' + year))

    if (isLeftEdge) {
        let prev = createSwitcher('prev')
        header.appendChild(prev)
    }

    header.appendChild(headerContent)
   
    if (isRightEdge) {
        let next = createSwitcher('next')
        header.appendChild(next)
    }

    header.setAttribute('data-month', month)
    header.setAttribute('data-year', year)
    header.setAttribute('data-group', groupId)
    header.setAttribute('data-header', true)

    return header
}

function createRow(day) {
    let wrapper = document.createElement('tr')
    let currentDay = day
    for (let i = 0; i < 7; i++) {
        wrapper.appendChild(createCell(currentDay))
        currentDay += 1
    }
    return { el: wrapper, day: currentDay }
}

function createRows(day, last) {
    let numRows = Math.floor(((last - day+ 1) / 7))
    let currentDay = day
    let fragment = document.createDocumentFragment()

    for(let i = 0; i < numRows; i++) {
        let row = createRow(currentDay)
        fragment.appendChild(row.el)
        currentDay = row.day
    }

    if (currentDay <= last) {
        let wrapper = document.createElement('tr')
        let counter = 0
        for (let i = currentDay; i <= last; i++) {
            wrapper.appendChild(createCell(currentDay))
            currentDay += 1
            counter += 1
        }
        wrapper.appendChild(createEmptyCells(7 - counter))
        fragment.appendChild(wrapper)
    }

    return fragment
}

function createSecondaryHeader(days) {
    let header = document.createElement('tr')

    let headerFragment = document.createDocumentFragment()

    days.forEach(day => {
        let text = document.createTextNode(day)
        let dayEl = document.createElement('th')
        dayEl.appendChild(text)
        headerFragment.appendChild(dayEl)
    })

    header.appendChild(headerFragment)

    return header
}

function createSwitcher(direction) {
    let switcher = document.createElement('th')
    let btn = document.createElement('button')
    btn.type = 'button'
    if (direction === 'prev') {
        btn.setAttribute('data-direction', '-1')
        btn.appendChild(document.createTextNode('<'))
    } else {
        btn.setAttribute('data-direction', '1')
        btn.appendChild(document.createTextNode('>'))
    }
    switcher.appendChild(btn)
    return switcher
}

function removeGroup () {
    let currentGroup = document.getElementById('ad-group')
    currentGroup && currentGroup.remove()
}

function renderGroup(date, weekdays, locale, weekDayFormat, before = 0, after = 0) {
    const range = createRange(before, after)
    let months = document.createElement('div')

    range.forEach( (r, idx) => {
        let isLeftEdge = typeof range[idx - 1] === 'undefined'
        let isRightEdge = typeof range[idx + 1] === 'undefined'
        let currentDate = shiftMonth(date, r)
        months.appendChild(createMonth(currentDate, weekdays, locale, weekDayFormat, r, isLeftEdge, isRightEdge))
    })

    months.id = 'ad-group'

    document.getElementById('datepicker').appendChild(months)
}

function replaceGroup(date, weekdays, locale, weekDayFormat, before = 0, after = 0) {
    removeGroup()
    renderGroup(date, weekdays, locale, weekDayFormat, before, after)
}


/**
 *  date manipulation
 */
function decrementMonth(date) {
    let month = date.getMonth()
    let year = date.getFullYear()
    return month === 0 ? new Date(year -1, 11, 1) : new Date(year, month - 1, 1)
}

function determineRenderStart (date, weekdays, locale, weekDayFormat) {
    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
    let weekday = firstDay.toLocaleDateString(locale, { weekday: weekDayFormat })
    return weekdays.findIndex(w => w === weekday)
}

function findFirstDay (date, start, locale, weekDayFormat, counter = 0) {
    let day = date.toLocaleDateString(locale, { weekday: weekDayFormat })
    if (counter > 7) {
        throw new Error ('First day of week is not in locale')
    }

    if (day === start) {
        return date
    } else {
        date.setDate(date.getDate() + 1)
        counter += 1
        return findFirstDay(date, start, locale, weekDayFormat, counter)
    }
}

function getWeekdays(firstDayOfWeek, locale, weekDayFormat) {
    let days = [ firstDayOfWeek.toLocaleDateString(locale, { weekday: weekDayFormat }) ]
    for (let i = 0; i < 6; i++) {
        firstDayOfWeek.setDate(firstDayOfWeek.getDate() + 1)
        days.push(firstDayOfWeek.toLocaleDateString(locale, { weekday: weekDayFormat }))
    }
    return days
}

function incrementMonth (date) {
    let month = date.getMonth()
    let year = date.getFullYear()
    return month === 11 ? new Date(year + 1, 0, 1) : new Date(year, month + 1, 1)
}

function shiftGroup (group, direction) {
    let origin = group.querySelector('[data-group="0"][data-header]')
    let month = parseInt(origin.getAttribute('data-month'))
    let year = parseInt(origin.getAttribute('data-year'))
    let date = new Date(year, month, 1)
    let step = group.querySelectorAll('[data-group][data-header]').length
    step = direction < 0 ? step * -1 : step
    let newDate = shiftMonth(date, step)

    return newDate
}

function shiftMonth (date, n) {
    let newDate = date
    
    if (n < 0) {
        let rng = createRange(n, -1)
        rng.forEach(_ => {
            newDate = decrementMonth(newDate)
        }) 
    }

    if (n > 0) {
        let rng = createRange(1, n)
        rng.forEach(_ => {
            newDate = incrementMonth(newDate)
        })
    }
    return newDate
}

function validateDate (dateArray) {
    return dateArray.length === 3 && dateArray[2].length === 4
}

/**
 *  utilities 
 */
function createRange (start, end) {
    let range = []
    for (let i = start; i <= end; i++) {
        range.push(i)
    }
    return range
}

function findGroupId (element) {
    let groupId = element.hasAttribute('data-group') && element.getAttribute('data-group')
    if (groupId !== false) {
        return groupId
    } else {
        return findGroupId(element.parentElement)
    }
}



/**
 *  Initialization and interactions
 */

document.onload = init()

function init () {
    initializeDatepicker({ locale: 'de-DE', firstDayOfWeek: 'Mo', weekDayFormat: 'short', dateFormat: 'dd.mm.yyyy' })
}

function initializeDatepicker ({ locale, firstDayOfWeek, weekDayFormat }) {
    const startingDay = findFirstDay(new Date(),firstDayOfWeek, locale, weekDayFormat)
    const weekdays = getWeekdays(startingDay, locale, weekDayFormat)
    let datepickerEl = document.getElementById('datepicker')
    let dateInput = document.createElement('input')
    dateInput.type = 'text'
    dateInput.id = 'ad-input'
    datepickerEl.appendChild(dateInput)
    let insertedInput = document.getElementById('ad-input')
    insertedInput.addEventListener('focus', function (e) {
        let val = e.target.value
        let dateArray = val.split('.')
        if (validateDate(dateArray)) {
            dateArray = dateArray.map(date => parseInt(date))
            renderGroup(new Date(dateArray[2], dateArray[1] - 1, dateArray[0]), weekdays, locale, weekDayFormat, -2)
        } else {
            renderGroup(new Date(), weekdays, locale, weekDayFormat, -2)
        }    
    })

    document.getElementsByTagName('body')[0].addEventListener('click', removeGroup)
    datepickerEl.addEventListener('click', function (e) {
        e.stopPropagation()
        let el = e.originalTarget
        if (el.hasAttribute('data-day')) {
            const groupId = findGroupId(el)
            const currentHeader = document.querySelector(`[data-group="${groupId}"][data-header="true"]`)
            const year = parseInt(currentHeader.getAttribute('data-year'))
            const month = parseInt(currentHeader.getAttribute('data-month'))
            const day = el.value
            const date = new Date(year, month, day)
            dateInput.value = date.toLocaleDateString(locale)
            removeGroup()
        }

        if (el.hasAttribute('data-direction')) {
            let dir = parseInt(el.getAttribute('data-direction'))
            let group = document.getElementById('ad-group')
            let newDate = shiftGroup(group, dir)
            replaceGroup(newDate, weekdays, locale, weekDayFormat, -2)
        }
    })
}

