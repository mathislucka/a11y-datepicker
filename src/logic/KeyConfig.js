import { getElementById, focusElement } from '../dom/Dom.js'
import { switchDateFocus, focusCurrentDay } from './CalendarChanges.js'
import { removeCalendar } from '../draw/Draw.js'

var rootKeyBindings = {
    '39': function (e, evtSource, config) { evtSource === 'day' && switchDateFocus(1, e.currentTarget, config) },
    '37': function (e, evtSource, config) { evtSource === 'day' && switchDateFocus(-1, e.currentTarget, config) },
    '38': function (e, evtSource, config) { evtSource === 'day' && switchDateFocus(-7, e.currentTarget, config) },
    '40': function (e, evtSource, config) { evtSource === 'day' && switchDateFocus(+7, e.currentTarget, config) },
    '27': function (e, evtSource, config) { focusElement(getElementById(config.id + 'input')); removeCalendar(e.currentTarget, config.id) },
    '40shift': function (e, evtSource, config, state) { focusCurrentDay(e.currentTarget, config, state) }
}

export { rootKeyBindings }