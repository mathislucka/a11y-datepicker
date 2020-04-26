import { findFirstDay, getWeekdays, shiftDate, shiftMonth, getCurrentDayOfWeek, createDateFromArray } from './../src/js/utils/DateManipulation.js'

describe("incrementing or decrementing dates", () => {
    test("it should increment a given date by n days", () => {
        const date = new Date (2000, 0, 1)
        const incrementBy = 7  
    
        const output = new Date (2000, 0, 8)
    
        expect(shiftDate(date, incrementBy).getTime()).toEqual(output.getTime())
      })

      test("it should decrement a given date by -n days", () => {
        const date = new Date (2000, 0, 1)
        const decrementBy = -7  
    
        const output = new Date (1999, 11, 25)
    
        expect(shiftDate(date, decrementBy).getTime()).toEqual(output.getTime())
      })

      test("it should not mutate the date passed in as an argument", () => {
        const date = new Date (2000, 0, 1)
        const incrementBy = 7  
        shiftDate(date, incrementBy)
        expect(date.getTime()).toEqual(date.getTime())
      })      
})

describe("incrementing or decrementing dates by months", () => {
    test("it should increment a given date's month by n months", () => {
        const date = new Date (2000, 0, 1)
        const incrementBy = 2  
    
        const output = new Date (2000, 2, 1)
    
        expect(shiftMonth(date, incrementBy).getTime()).toEqual(output.getTime())
      })
      
      test("it should decrement a given date's month by -n months", () => {
        const date = new Date (2000, 0, 1)
        const decrementBy = -2  
    
        const output = new Date (1999, 10, 1)
    
        expect(shiftMonth(date, decrementBy).getTime()).toEqual(output.getTime())
      })

      test("it should not mutate the date passed in as an argument", () => {
        const date = new Date (2000, 0, 1)
        const incrementBy = 2  
        shiftMonth(date, incrementBy)
    
        expect(date.getTime()).toEqual(date.getTime())
      })
})

describe("getting days n days from sunday", () => {
    test("it should increment a constant sunday by n days", () => {
        const incrementBy = 1  
        const SUNDAY = new Date(2014, 10, 9)
        const output = new Date(SUNDAY.setDate(SUNDAY.getDate() + incrementBy))
    
        expect(findFirstDay(incrementBy).getTime()).toEqual(output.getTime())
      })
})

describe("getting string representations of weekdays starting from a given day of the week", () => {
    test("it should return an array of weekday strings starting on the day that is passed in as an argument", () => {
        const startingDay = new Date (2014, 10, 10)
        const locale = 'en-EN'
        const weekdayFormat = 'short'  
        const output = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    
        expect(getWeekdays(startingDay, locale, weekdayFormat)).toEqual(output)
      })

      test("it should return weekdays matching the language passed in as the locale parameter", () => {
        const startingDay = new Date (2014, 10, 10)
        const locale = 'fr-FR'
        const weekdayFormat = 'short'  
        const output = ['lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.', 'dim.']
    
        expect(getWeekdays(startingDay, locale, weekdayFormat)).toEqual(output)
      })

      test("it should return weekdays matching the weekday format passed in as an argument", () => {
        const startingDay = new Date (2014, 10, 10)
        const locale = 'en-EN'
        const weekdayFormat = 'narrow'  
        const output = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
    
        expect(getWeekdays(startingDay, locale, weekdayFormat)).toEqual(output)
      })
})

describe('creating javascript Date objects', () => {
  test("it should create a date based on year, month and day", () => {
      const day = 1  
      const month = 0
      const year = 2000

      const output = new Date (2000, 0, 1)
  
      expect(createDateFromArray([year, month, day]).getTime()).toEqual(output.getTime())
    })
})

describe('Mapping a date from a custom day of week config to JS day of week equivalent', () => {
  test("it should return the JS day of week matching the date while considering the custom weekday config", () => {
      const weekStart = 2
      const date = new Date(2014, 10, 9)

      const output = 5
  
      expect(getCurrentDayOfWeek(date, weekStart)).toEqual(output)
    })
})