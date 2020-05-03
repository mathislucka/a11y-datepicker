function createRow(day, dayFunc, config) {
    var wrapper = document.createElement('tr')
    var currentDay = day
    for (var i = 0; i < 7; i++) {
        wrapper.appendChild(dayFunc(currentDay, config.weekdays[i]))
        currentDay += 1
    }
    return { el: wrapper, day: currentDay }
}

function createRows(day, last, dayFunc, config) {
    var numRows = Math.floor(((last - day + 1) / 7))
    var currentDay = day
    var fragment = document.createDocumentFragment()

    for(var i = 0; i < numRows; i++) {
        var row = createRow(currentDay, dayFunc, config)
        fragment.appendChild(row.el)
        currentDay = row.day
    }

    var wrapper = document.createElement('tr')
    var counter = 0
    for (var i = currentDay; i <= last; i++) {
        wrapper.appendChild(dayFunc(currentDay, config.weekdays[counter]))
        currentDay += 1
        counter += 1
    }
    var empties = createEmptyCells(7 - counter)
    wrapper.appendChild(empties)
    fragment.appendChild(wrapper)

    return fragment
}

function createFirstRow (start, dayFunc, config) {
    var counter = start
    var firstRow = document.createElement('tr')
    var day = 1
    var empties = createEmptyCells(7 - (7 - start))
    firstRow.appendChild(empties)
    for(var i = counter; i < 7; i++) {
        firstRow.appendChild(dayFunc(day, config.weekdays[day]))
        day += 1
    }
    return { el: firstRow, end: day }
}

function createEmptyCells (n) {
    var fragment = document.createDocumentFragment()
    for (var i = 0; i < n; i++) {
        fragment.appendChild(document.createElement('td'))
    }
    return fragment
}

export { createRows, createFirstRow }
