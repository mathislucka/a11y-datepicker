import { isInRange, isValidFormat } from './../src/utils/Validators.js'

describe("checking if a date string matches a specified date format", () => {
    test("it should return false if the date is not separated by . or - or /", () => {
        const date = '01,01,2020'
        const format = 'dd,mm,yyyy'
        const output = false
    
        expect(isValidFormat(date, format)).toBe(output)
      })

      test("it should return false if the date does not match the specified format", () => {
        const date = '01,01,2020'
        const format = 'dd.mm.yyyy'
        const output = false
    
        expect(isValidFormat(date, format)).toBe(output)
      })

      test("it should return true if the date matches the specified format", () => {
        const date = '01.01.2020'
        const format = 'dd.mm.yyyy'
        const output = true
    
        expect(isValidFormat(date, format)).toBe(output)
      })
})

describe("checking if a date is within a date range", () => {
    test("it should return true if no range is specified", () => {
        const date = new Date (2000, 0, 1)
    
        const output = true
    
        expect(isInRange(date)).toBe(output)
      })

    test("it should return true if a JS Date is within a range of JS Dates", () => {
        const date = new Date (2000, 0, 1)
        const min = new Date (1999, 11, 1)
        const max = new Date (2000, 0, 2)
    
        const output = true
    
        expect(isInRange(date, min, max)).toBe(output)
      })

      test("it should return false if a JS Date is greater than the max Date", () => {
        const date = new Date (2000, 0, 3)
        const min = null
        const max = new Date (2000, 0, 2)
    
        const output = false
    
        expect(isInRange(date, min, max)).toBe(output)
      })

      test("it should return false if a JS Date is smaller than the min Date", () => {
        const date = new Date (2000, 0, 1)
        const min = new Date (2000, 0, 2)
    
        const output = false
    
        expect(isInRange(date, min)).toBe(output)
      })

      test("it should accept date strings as parameters if a valid format is specified", () => {
        const date = '01.01.2000'
        const min = '01.12.1999'
        const max = '02.01.2000'
        const format = 'dd.mm.yyyy'
        
        const output = true
    
        expect(isInRange(date, min, max, format)).toBe(output)
      })

      test("it should accept a mix of date strings and JS dates as parameters if a valid format is specified", () => {
        const date = new Date (2000, 0, 1)
        const min = '01.12.1999'
        const max = '02.01.2000'
        const format = 'dd.mm.yyyy'
        
        const output = true
    
        expect(isInRange(date, min, max, format)).toBe(output)
      })
})