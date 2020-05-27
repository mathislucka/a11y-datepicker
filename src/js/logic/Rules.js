function Rules (config) {
  function shouldClose (e) {
    var el = e.relatedTarget
    // close if there is no related target
    if (!el) return true
    // close if the related target is not a datepicker element
    if (!el.getAttribute('data-ad-id')) return true
    // close if the input el of another datepicker instance is focused
    if (el.tagName === 'INPUT' && el.getAttribute('data-ad-id') !== config.id + 'input') return true
    return false
  }

  return {
    shouldCloseOnFocusOut: shouldClose
  }
}

export { Rules }