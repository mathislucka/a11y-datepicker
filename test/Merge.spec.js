import { merge } from './../src/js/utils/Merge.js'

describe("merging 2 objects", () => {
    test("it should merge 2 objects and return a new object", () => {
        const obj1 = { a: 'test' }
        const obj2 = { b: 'another test' } 
    
        const output = { a: 'test', b: 'another test' }
    
        expect(merge(obj1, obj2)).toEqual(output)
      })

      test("the second object should override props on the first object", () => {
        const obj1 = { a: 'test', b: 'also testing' }
        const obj2 = { a: 'another test' } 
    
        const output = { a: 'another test', b: 'also testing' }
    
        expect(merge(obj1, obj2)).toEqual(output)
      })

      test("it should only consider ownProperties during merging", () => {
            function Obj1 () {}
            Obj1.prototype.a = 'something'
            const obj1 = new Obj1()
            const obj2 = {}

            expect(merge(obj1, obj2).a).toBeUndefined()
      })
})