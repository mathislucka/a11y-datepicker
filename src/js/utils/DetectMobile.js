function isMobileDevice () {
    return navigator.userAgent.match(/mobi/ig)
}

export { isMobileDevice }