function findFirstDay (weekStart) {
    var SUNDAY = createDateFromArray([2014, 10, 9])
    return shiftDate(SUNDAY, weekStart)
}

function getWeekdays (first, locale, weekDayFormat, weekdays) {
    if (!weekdays) weekdays = []
    if (weekdays.length === 7) return weekdays
    weekdays.push(first.toLocaleDateString(locale, { weekday: weekDayFormat }))
    return getWeekdays(shiftDate(first, 1), locale, weekDayFormat, weekdays)
}

function shiftMonth (date, n) {
    var clone = new Date(date.getTime())
    clone.setHours(0, 0, 0, 0)
    clone.setDate(1)
    clone.setMonth(clone.getMonth() + n)
    return clone
}

function getCurrentDayOfWeek (date, weekStart) {
    return getWeekdayMapping(weekStart).indexOf(date.getDay())
}

function getWeekdayMapping (weekStart, mapping) {
    if (!mapping) mapping = []
    if (mapping.length === 7) return mapping
    mapping.push(weekStart)
    return getWeekdayMapping(weekStart === 6 ? 0 : weekStart + 1, mapping)
}

function shiftDate (date, step) {
    var clone = new Date(date.getTime())
    return new Date(clone.setDate(clone.getDate() + step))
}

function createDateFromArray (dateArray) {
    return new Date(dateArray[0], dateArray[1], dateArray[2])
}


export { createDateFromArray, getCurrentDayOfWeek, findFirstDay, getWeekdays, shiftMonth, shiftDate }