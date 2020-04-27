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

    if (currentDay <= last) {
        var wrapper = document.createElement('tr')
        var counter = 0
        for (var i = currentDay; i <= last; i++) {
            wrapper.appendChild(dayFunc(currentDay, config.weekdays[counter]))
            currentDay += 1
            counter += 1
        }
        // var empties = document.createDocumentFragment()
        // for (var i = 0; i < 7 - counter; i++) {
        //     var child = document.createElement('td')
        //     empties.appendChild(child)
        // }
        var empties = createEmptyCells(7 - counter)
        wrapper.appendChild(empties)
        fragment.appendChild(wrapper)
    }

    return fragment
}

function createFirstRow (start, dayFunc, config) {
    // debugger
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

function createEdgeRow (start, end, pad) {
    var wrapper = document.createElement('tr')
    for (var i = start; i < end; i++) {

    }
}

function padRow (row, direction) {
    var out = document.createDocumentFragment()
    var rowLength = Array.prototype.slice.call(row.getElementsByTagName('TD')).length
    var missing = 7 - rowLength
    var empties = createEmptyCells(missing)
    if (direction === 'left') {
        out.appendChild(empties)
        out.appendChild(row)
    } else {
        out.appendChild(row)
        out.appendChild(empties)
    }
    return out
}

function createEmptyCells (n) {
    var fragment = document.createDocumentFragment()
    for (var i = 0; i < n; i++) {
        fragment.appendChild(document.createElement('td'))
    }
    return fragment
}

export { createRows, createFirstRow }
