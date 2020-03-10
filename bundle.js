'use strict';

function findFirstDay (weekStart) {
    var SUNDAY = createDateFromArray([2014, 10, 9]);
    return shiftDate(SUNDAY, weekStart)
}

function getWeekdays (first, locale, weekDayFormat, weekdays) {
    if (!weekdays) weekdays = [];
    if (weekdays.length === 7) return weekdays
    weekdays.push(first.toLocaleDateString(locale, { weekday: weekDayFormat }));
    return getWeekdays(shiftDate(first, 1), locale, weekDayFormat, weekdays)
}

function shiftMonth (date, n) {
    var clone = new Date(date.getTime());
    clone.setHours(0, 0, 0, 0);
    clone.setDate(1);
    clone.setMonth(clone.getMonth() + n);
    return clone
}

function getCurrentDayOfWeek (date, weekStart) {
    return getWeekdayMapping(weekStart).indexOf(date.getDay())
}

function getWeekdayMapping (weekStart, mapping) {
    if (!mapping) mapping = [];
    if (mapping.length === 7) return mapping
    mapping.push(weekStart);
    return getWeekdayMapping(weekStart === 6 ? 0 : weekStart + 1, mapping)
}

function shiftDate (date, step) {
    var clone = new Date(date.getTime());
    return new Date(clone.setDate(clone.getDate() + step))
}

function createDateFromArray (dateArray) {
    return new Date(dateArray[0], dateArray[1], dateArray[2])
}

function createRange (start, end, rng) {
    if (!rng) rng = [];
    rng.push(start);
    return (start < end && createRange(start + 1, end, rng)) || rng
}

function createSwitcher(direction, year, month) {
    var switcher = document.createElement('th');
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.value = year + '$' + month;
    if (direction === 'prev') {
        btn.setAttribute('data-ad-id', '-1');
        btn.appendChild(document.createTextNode('<'));
    } else {
        btn.setAttribute('data-ad-id', '1');
        btn.appendChild(document.createTextNode('>'));
    }
    switcher.appendChild(btn);
    return switcher
}

function createPrimaryHeader(year, month, monthString, isLeftEdge, isRightEdge) {
    var header = document.createElement('tr');
    var headerContent = document.createElement('th');
    var colSpan = (isLeftEdge && isRightEdge && 5) || ((isLeftEdge || isRightEdge) && 6) || 7; 
    headerContent.colSpan = colSpan;
    headerContent.appendChild(document.createTextNode(monthString + ' ' + year));

    if (isLeftEdge) {
        var prev = createSwitcher('prev', year, month);
        header.appendChild(prev);
    }

    header.appendChild(headerContent);
   
    if (isRightEdge) {
        var next = createSwitcher('next', year, month);
        header.appendChild(next);
    }

    return header
}

function createSecondaryHeader(days) {
    var header = document.createElement('tr');

    days.forEach( function (day) {
        var text = document.createTextNode(day);
        var dayEl = document.createElement('th');
        dayEl.appendChild(text);
        header.appendChild(dayEl);
    });

    return header
}

function createButton(day, month, year, localMonth, weekday, isEnabled) {
    var btn = document.createElement('button');
    var txt = document.createTextNode(day);
    btn.value = year +'$' + month + '$' + day;
    btn.type = 'button';
    btn.setAttribute('data-day', true);
    btn.setAttribute('data-ad-id', '' + day + month + year);
    btn.setAttribute('aria-label', weekday + ' ' + day + ' ' + localMonth + ' ' + year);
    btn.setAttribute('aria-disabled', !isEnabled);
    btn.appendChild(txt);
    return btn
}

function configureDays (month, year, localMonth, rangeChecker) {
    return function (day, weekday) {
        var cell = document.createElement('td');
        var date = createDateFromArray([year, month, day]);
        cell.appendChild(createButton(day, month, year, localMonth, weekday, rangeChecker(date)));
        return cell
    }
}

function createRow(day, dayFunc, config) {
    var wrapper = document.createElement('tr');
    var currentDay = day;
    for (var i = 0; i < 7; i++) {
        wrapper.appendChild(dayFunc(currentDay, config.weekdays[i]));
        currentDay += 1;
    }
    return { el: wrapper, day: currentDay }
}

function createRows(day, last, dayFunc, config) {
    var numRows = Math.floor(((last - day + 1) / 7));
    var currentDay = day;
    var fragment = document.createDocumentFragment();

    for(var i = 0; i < numRows; i++) {
        var row = createRow(currentDay, dayFunc, config);
        fragment.appendChild(row.el);
        currentDay = row.day;
    }

    if (currentDay <= last) {
        var wrapper = document.createElement('tr');
        var counter = 0;
        for (var i = currentDay; i <= last; i++) {
            wrapper.appendChild(dayFunc(currentDay, config.weekdays[counter]));
            currentDay += 1;
            counter += 1;
        }
        var empties = document.createDocumentFragment();
        for (var i = 0; i < 7 - counter; i++) {
            var child = document.createElement('td');
            empties.appendChild(child);
        }
        wrapper.appendChild(empties);
        fragment.appendChild(wrapper);
    }

    return fragment
}

function createFirstRow (start, dayFunc, config) {
    var counter = start;
    var fragment = document.createDocumentFragment();
    var day = 1;

    for(var i = counter; i < 7; i++) {
        fragment.appendChild(dayFunc(day, config.weekdays[day]));
        day += 1;
    }
    
    var empties = document.createDocumentFragment();
    for (var i = 0; i < start; i++) {
        var child = document.createElement('td');
        empties.appendChild(child);
    }

    let firstRow = document.createElement('tr');
    firstRow.appendChild(empties);
    firstRow.appendChild(fragment);
    return { el: firstRow, end: day }
}

function createFormatMapping (format, separator) {
    var dateFormat = format.split(separator);
    dateFormat.forEach(function (d, idx) {
        if (d.indexOf('d') > -1) dateFormat[idx] = 'day';
        if (d.indexOf('m') > -1) dateFormat[idx] = 'month';
        if (d.indexOf('y') > -1) dateFormat[idx] = 'year';
    });
    return dateFormat
}

function datePart (dateFormat) {
    return function (date, part) {
        return date[dateFormat.indexOf(part)]
    }
}

function findSeparator (format) {
    var separator;
    if (format.indexOf('.') > -1) separator = '.';
    if (format.indexOf('-') > -1) separator = '-';
    if (format.indexOf('/') > -1) separator = '/';
    return separator
}

function toDate (date, format) {
    var separator = findSeparator(format);
    var mapping = createFormatMapping(format, separator);
    var newDate = date.split(separator);
    var f = datePart(mapping);
    return new Date(f(newDate, 'year'), f(newDate, 'month') - 1, f(newDate, 'day'))
}

function toDateString (date, format) {
    var separator = findSeparator(format);
    var dateFormat = format.split(separator);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    var splitDate = dateFormat.map(function (f) {
        if (f.match(/d/i)) return leftPadDate(day, f)
        if (f.match(/m/i)) return leftPadDate(month, f)
        if (f.match(/y/i)) return leftPadDate(year, f)
    });
    
    return splitDate.join(separator) 
}

function leftPadDate (date, dateFormat) {
    var diff = (dateFormat + '').length - (date + '').length;
    if (diff === 0) return date
    if (diff > 0) return addZeros(date, diff)
    if (diff < 0) throw new Error('Invalid date format')
}

function addZeros (int, n) {
    var out = int + '';
    for (var i = 0; i < n; i++) {
        out = 0 + out;
    }
    return out
}

function createDateFromDayEl (el) {
    return createDateFromArray(el.value.split('$').map(function (d) { return parseInt(d) }))
}

function isValidFormat (dateString, format) {
    var separator = findSeparator(format);
    var dateFormat = createFormatMapping(format, separator);

    var f = datePart(dateFormat);

    var date = dateString.split(separator);
    date = date.map(function (d) { return parseInt(d) });
    if (date.length !== 3) return false
    if (f(date, 'month') > 12 || f(date, 'month') < 1) return false
    var test = new Date(f(date, 'year'), f(date, 'month') - 1, f(date, 'day'));
    if(!isValidDate(test)) return false
    return true
}

function isValidDate(date) {
    return date instanceof Date && !isNaN(date);
}

function isInRange (date, min, max, format) {
    var mi = min && ((isValidDate(min) && min) ||  toDate(min, format));
    var ma = max && ((isValidDate(max) && max) ||  toDate(max, format));
    var d = (isValidDate(date) && date) ||  toDate(date, format);

    return (!mi || mi <= d) && (!ma || ma >= d)
}

function createMonth(date, isLeftEdge, isRightEdge, config) {
    var year = date.getFullYear();
    var month = date.getMonth();
    var monthString = date.toLocaleDateString(config.locale, { month: 'long' });
    var start = getCurrentDayOfWeek(date, config.weekStartsOn);
    var lastDay = createDateFromArray([year, month + 1, 0]).getDate();

    var rangeChecker = (function (minDate, maxDate, format) {
        return function (date) {
            return isInRange(date, minDate, maxDate, format)
        }
    })(config.minDate, config.maxDate, config.dateFormat);

    var dayFunc = configureDays(month, year, monthString, rangeChecker);

    var table = document.createElement('table');
    var head = document.createElement('thead');
    head.appendChild(createPrimaryHeader(year, month, monthString, isLeftEdge, isRightEdge));
    head.appendChild(createSecondaryHeader(config.weekdays));
    table.appendChild(head);
    var firstRow = createFirstRow(start, dayFunc, config);
    table.appendChild(firstRow.el);
    table.appendChild(createRows(firstRow.end, lastDay, dayFunc, config));

    return table
}

function renderGroup(el, date, config, before, after) {
    var range = createRange(before, after);
    var group = document.createElement('div');

    range.forEach( function (r, idx) {
        var isLeftEdge = typeof range[idx - 1] === 'undefined';
        var isRightEdge = typeof range[idx + 1] === 'undefined';
        var currentDate = shiftMonth(date, r);
        group.appendChild(createMonth(currentDate, isLeftEdge, isRightEdge, config));
    });

    group.setAttribute('data-ad-id', config.id + 'group');
    el.appendChild(group);
}

function shiftGroup (date, direction, config) {
    var groupLen = createRange(config.monthsBeforeCurrent, config.monthsAfterCurrent).length;
    var step = direction < 0 ? groupLen * -1 : groupLen;
    var before = step < 0 ? 0 : groupLen - 1;
    var after = step < 0 ? groupLen - 1 : 0;

    return {
        date: shiftMonth(date, step),
        before: before * -1,
        after: after
    }
}

function focusElement (el) {
    el.focus();
    return true
}

function getFocussedElement () {
    return document.activeElement
}

function getElementById (id) {
    return document.querySelector('[data-ad-id="' + id + '"]')
}

function getElementByDate (date) {
    return getElementById('' + date.getDate() + date.getMonth() + date.getFullYear())
}

function getFocussedDay () {
    return createDateFromDayEl(getFocussedElement())
}

function on (evt, el, handler) {
    el.addEventListener(evt, handler, true);
  
    return function () {
      el.removeEventListener(evt, handler, true);
    }
}

function isDay (el) {
    return el.hasAttribute('data-day')
}

function isSwitcher (el) {
    var dir =  el.getAttribute('data-ad-id');
    return dir === '1' || dir === '-1'
}

function redrawCalendar (calendarRootElement, drawingDate, config, before, after) {
    before = before || config.monthsBeforeCurrent;
    after = after || config.monthsAfterCurrent;
    removeCalendar(calendarRootElement, config.id);
    renderGroup(calendarRootElement, drawingDate, config, before, after);
}

function removeCalendar (calendarRootElement, calendarId) {
    var calendar = getElementById(calendarId + 'group');
    calendar && calendarRootElement.removeChild(calendar);
}

function drawDateInput (calendarRootElement, config) {
    var description = document.createElement('p');
    description.appendChild(document.createTextNode(config.translations.description));
    description.classList.add('visuallyhidden');
    description.id = config.id + description;
    calendarRootElement.appendChild(description);

    var dateInput = document.createElement('input');
    dateInput.setAttribute('aria-describedby', config.id + 'description');
    dateInput.type = 'text';
    dateInput.setAttribute('data-ad-id', config.id + 'input');
    calendarRootElement.appendChild(dateInput);
    return dateInput
}

function drawMobileDateInput (calendarRootElement, config) {
    var input = document.createElement('input');
    input.type = 'date';
    config.maxDate && setDateBound(input, 'max', config.maxDate, config.dateFormat);
    config.minDate && setDateBound(input, 'min', config.minDate, config.dateFormat);
    calendarRootElement.appendChild(input);
}

function setDateBound(el, type, date, dateFormat) {
    var bound = toDate(date, dateFormat);
    max = toDateString(bound, 'yyyy-mm-dd');
    el.setAttribute(type, bound); 
}

function renderMissingDate (el, dir, date, config) {
    var direction = dir > 0 ? 1 : -1;
    var newGroup = shiftGroup(date, direction, config);
    redrawCalendar(el, newGroup.date, config, newGroup.before, newGroup.after);
    return true
}

function switchDateFocus (step, el, config) {
    var date = getFocussedDay();
    var newDate = shiftDate(date, step);
    var newDay = getElementByDate(newDate);
    (newDay && focusElement(newDay)) || (renderMissingDate(el, step, date, config) && focusElement(getElementByDate(newDate)));
}

function focusCurrentDay (el, config, state) {
    var date = state || (config.initialDate && toDate(config.initialDate, config.dateFormat)) || new Date(); 
    redrawCalendar(el, date, config);
    focusElement(getElementByDate(date));
}

var rootKeyBindings = {
    '39': function (e, evtSource, config) { evtSource === 'day' && switchDateFocus(1, e.currentTarget, config); },
    '37': function (e, evtSource, config) { evtSource === 'day' && switchDateFocus(-1, e.currentTarget, config); },
    '38': function (e, evtSource, config) { evtSource === 'day' && switchDateFocus(-7, e.currentTarget, config); },
    '40': function (e, evtSource, config) { evtSource === 'day' && switchDateFocus(+7, e.currentTarget, config); },
    '27': function (e, evtSource, config) { focusElement(getElementById(config.id + 'input')); removeCalendar(e.currentTarget, config.id); },
    '40shift': function (e, evtSource, config, state) { focusCurrentDay(e.currentTarget, config, state); }
};

function Listeners (config, setState, getState) {

    this.setListeners = function setListeners (rootEl, inputEl) {
        var focus = on('focus', inputEl, openDatepicker);
        var click = on('click', rootEl, clickSwitch);
        var keydown = on('keydown', rootEl, keyPressSwitch);
        var input = on('input', inputEl, updateDatePicker);
        var inputClick = on('click', inputEl, openDatepicker);
        var blur = on('blur', inputEl, closeDatePicker);
        var mousedown = on('mousedown', rootEl, preventBlur);
    };

    function preventBlur (e) {
        if (e.target.hasAttribute('data-direction')) {
            e.preventDefault();
        }
    }

    function updateDatePicker (e) {
        var el = e.target;
        var dateCandidate = isValidFormat(el.value, config.dateFormat)
            && isInRange(el.value, config.minDate, config.maxDate, config.dateFormat)
            && toDate(el.value, config.dateFormat);
        
        if (dateCandidate) {
            setState('selectedDate', dateCandidate);
            redrawCalendar(el.parentNode, getState('selectedDate'), config);
            el.setCustomValidity('');
        } else {
            el.setCustomValidity('invalid date');
        }
    }
    
    function closeDatePicker (e) {
        if (!e.relatedTarget || !e.relatedTarget.getAttribute('data-ad-id')) {
            removeCalendar(e.currentTarget.parentNode, config.id);
        }
    }

    function openDatepicker (e) {
        if ((e.target.value === '' || e.type === 'click') && !getElementById(config.id + 'group')) {
            var el = e.target.parentNode;
            var date = getState('selectedDate') || (config.initialDate && toDate(config.initialDate, config.dateFormat)) || new Date();
            redrawCalendar(el, date, config);
            getElementById(config.id + 'group').scrollIntoView();
        }
    }
    
    function selectDate (target, inputEl) {
        var date = createDateFromDayEl(target);
        if (isInRange(date, config.minDate, config.maxDate, config.dateFormat)) {
            inputEl.value = toDateString(date, config.dateFormat);
            setState('selectedDate', date);
            removeCalendar(inputEl.parentNode, config.id);
            inputEl.setCustomValidity('');
            inputEl.focus();
        }
    }

    function triggerSwitch(e) {
        var root = e.currentTarget;
        var dir = parseInt(e.target.getAttribute('data-ad-id'));
        var date = e.target.value.split('$');
        console.log(date);
        date = createDateFromArray([date[0], date[1], 1]);
        var newGroup = shiftGroup(date, dir, config);
        redrawCalendar(root, newGroup.date, config, newGroup.before, newGroup.after);
    }
    
    function clickSwitch (e) {
        var el = e.target;
        var inputEl = getElementById(config.id + 'input');
        isDay(el) && selectDate(el, inputEl);
        console.log('called');
        isSwitcher(el) && triggerSwitch(e);
    }
    
    function keyPressSwitch (e) {
        var evtSource = isDay(getFocussedElement()) ? 'day' : null;
        var key = e.shiftKey ? e.which + 'shift' : e.which;
        rootKeyBindings[key] && rootKeyBindings[key](e, evtSource, config, getState('selectedDate'));
    }
}

function merge (base, overrides) {
    var merged = add({}, base);
    merged = add(merged, overrides);
    return merged
}

function add (base, addition) {
    Object.keys(addition).forEach(function (key) {
        base[key] = addition[key];
    });
    return base
}

function isMobileDevice () {
    return navigator.userAgent.match(/mobi/ig)
}

var defaultConfig = {
    locale: 'en-EN',
    weekDayFormat: 'short',
    minDate: null,
    maxDate: null,
    initialDate: null,
    monthsBeforeCurrent: 0,
    monthsAfterCurrent: 0,
    weekStartsOn: 1,
    id: '_ad-',
    dateFormat: 'yyyy-mm-dd'
};

var defaultTranslations = {
    description: 'This is a datepicker. You can type in a date using the keyboard. Use the required date format. It should be:' +
        defaultConfig.dateFormat + ' You can also use the datepicker to select a date.' +
        ' Press shift and arrow down to focus the datepicker.' +
        ' Press left arrow to move one day back.' +
        ' Press right arrow to move one day ahead.' +
        ' Press arrow up to move one week back. ' +
        ' Press arrow down to move one week ahead' +
        ' Press Space to select a date.' +
        ' Press Escape to close the datepicker.',
    notInRange: 'The date is not within the intended date range.',
    nextGroups: 'Show next months.',
    prevGroups: 'Show previous months.',
};

function Datepicker(userConfig, userTranslations) {
    
    var state = { selectedDate: null };
    var setState = function (prop, value) { state[prop] = value; };
    var getState = function (key) { return state[key] };

    function initialize (userConfig, userTranslations, setState, getState) {
        
        var config = merge(defaultConfig, userConfig || {});
        config.translations = merge(defaultTranslations, userTranslations || {});
        config.monthsBeforeCurrent = config.monthsBeforeCurrent * -1;
        config.weekdays = getWeekdays(findFirstDay(config.weekStartsOn), config.locale, config.weekDayFormat);
        
        var calendarRootElement = document.getElementById(config.id + 'datepicker');
        
        if (!isMobileDevice()) {
            var inputEl = drawDateInput(calendarRootElement, config);
            var listeners = new Listeners(config, setState, getState);
            listeners.setListeners(calendarRootElement, inputEl);
        } else {
            drawMobileDateInput(calendarRootElement, config);
        }
    }

    initialize(userConfig, userTranslations, setState, getState);
}

module.exports = Datepicker;
