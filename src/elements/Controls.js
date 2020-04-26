function createSwitcher(direction, year, month) {
    var switcher = document.createElement('th')
    var btn = document.createElement('button')
    btn.type = 'button'
    btn.value = year + '$' + month
    var icon = direction === '-1' ? '<' : '>'
    
    btn.setAttribute('data-ad-id', direction)
    btn.appendChild(document.createTextNode(icon))
    switcher.appendChild(btn)
    return switcher
}

export { createSwitcher }