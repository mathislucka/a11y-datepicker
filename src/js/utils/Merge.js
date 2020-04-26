function merge (base, overrides) {
    var merged = add({}, base)
    merged = add(merged, overrides)
    return merged
}

function add (base, addition) {
    Object.keys(addition).forEach(function (key) {
        base[key] = addition[key]
    })
    return base
}

export { merge }