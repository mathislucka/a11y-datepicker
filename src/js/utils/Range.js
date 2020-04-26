function createRange (start, end, rng) {
    if (!rng) rng = []
    rng.push(start)
    return (start < end && createRange(start + 1, end, rng)) || rng
}

export { createRange }