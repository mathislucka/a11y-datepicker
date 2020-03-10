function createSwitcher(direction, year, month) {
    var switcher = document.createElement('th')
    var btn = document.createElement('button')
    btn.type = 'button'
    btn.value = year + '$' + month
    if (direction === 'prev') {
        btn.setAttribute('data-ad-id', '-1')
        btn.appendChild(document.createTextNode('<'))
    } else {
        btn.setAttribute('data-ad-id', '1')
        btn.appendChild(document.createTextNode('>'))
    }
    switcher.appendChild(btn)
    return switcher
}

export { createSwitcher }