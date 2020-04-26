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
        var empties = document.createDocumentFragment()
        for (var i = 0; i < 7 - counter; i++) {
            var child = document.createElement('td')
            empties.appendChild(child)
        }
        wrapper.appendChild(empties)
        fragment.appendChild(wrapper)
    }

    return fragment
}

function createFirstRow (start, dayFunc, config) {
    var counter = start
    var fragment = document.createDocumentFragment()
    var day = 1

    for(var i = counter; i < 7; i++) {
        fragment.appendChild(dayFunc(day, config.weekdays[day]))
        day += 1
    }
    
    var empties = document.createDocumentFragment()
    for (var i = 0; i < start; i++) {
        var child = document.createElement('td')
        empties.appendChild(child)
    }

    let firstRow = document.createElement('tr')
    firstRow.appendChild(empties)
    firstRow.appendChild(fragment)
    return { el: firstRow, end: day }
}

export { createRows, createFirstRow }
