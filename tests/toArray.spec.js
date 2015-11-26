describe("toArray", ()=> {
    var {toArray} = caster;
    it("exists", ()=> {
        expect(typeof toArray).toBe('function');
    });
    it("bypasses an array", function () {
        var arr = [42];
        expect(toArray(arr)).toBe(arr);
    });
    it("casts non-array, yet non-empty value to array with that value", function () {
        // that is easy
        expect(toArray(42)).toEqual([42]);
        // these are probably not so obvious
        expect(toArray(0)).toEqual([0]);
        expect(toArray(false)).toEqual([false]);
        // these values are being put as they come in
        var a = {};
        expect(toArray(a)).toEqual([a]);
        expect(toArray(a)[0]).toBe(a);
    });
    it("casts empty value to empty array", function () {
        expect(toArray(null)).toEqual([]);
        expect(toArray()).toEqual([]);
    })
});
