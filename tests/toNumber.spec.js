describe("toNumber", ()=> {
    var {toNumber} = caster;
    it("exists", ()=> {
        expect(typeof toNumber).toBe("function");
    });
    describe("bypasses", function () {
        it("number", ()=> {
            expect(toNumber(2)).toBe(2);
            expect(toNumber(0)).toBe(0);
        });
    });
    describe("casts", function () {
        it("NaN", ()=> {
            expect(toNumber(NaN)).toBe(0);
            expect(toNumber('foo')).toBe(0);
        });
        it("string with int", ()=> {
            expect(toNumber(" 3")).toBe(3);
        });
        it("string with float", ()=> {
            expect(toNumber(" 3.5")).toBe(3.5);
            expect(toNumber(" 3,5 ")).toBe(3.5);
        });
        it("string with hex", ()=> {
            expect(toNumber("0xff")).toBe(255);
            expect(toNumber("#ff")).toBe(255);
        });
        it("object with valueOf available", ()=> {
            var now = Date.now();
            var dateNow = new Date(now);
            expect(toNumber(dateNow)).toBe(now);
        });
    })
});
