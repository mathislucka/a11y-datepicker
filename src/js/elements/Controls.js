import { emitEvent } from './../dom/Dom.js'
function createSwitcher(direction, year, month) {
    var switcher = document.createElement('th')
    var btn = document.createElement('button')
    btn.type = 'button'
    btn.value = year + '$' + month
    var icon = direction === '-1'
        ? '<svg data-ad-id="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 16" width="6" height="16"><path data-ad-id="icon" fill-rule="evenodd" d="M6 2L0 8l6 6V2z"></path></svg>' 
        : '<svg data-ad-id="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 16" width="6" height="16"><path data-ad-id="icon" fill-rule="evenodd" d="M0 14l6-6-6-6v12z"></path></svg>'
    
    btn.setAttribute('data-ad-id', direction)
    btn.setAttribute('data-direction', true)
    btn.innerHTML = icon
    
    // This is a bit hacky. It should cancel click events on svg or path
    // and dispatch an event from btn instead so that it can be handled by event listeners higher up the dom.
    function setEventTarget (ev) {
            ev.preventDefault()
            ev.stopPropagation()
            btn.removeEventListener('mousedown', setEventTarget)
            emitEvent(btn, 'mousedown')
    }

    btn.addEventListener('mousedown', setEventTarget)
    switcher.appendChild(btn)
    return switcher
}

export { createSwitcher }
