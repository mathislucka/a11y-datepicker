import { createRange } from './../src/js/utils/Range.js'

describe("range creation function", () => {
    test("it should create a range including all numbers from start to end", () => {
        const start = -2
        const end = 2 
    
        const output = [-2, -1, 0, 1, 2]
    
        expect(createRange(start, end)).toEqual(output)
      })
})