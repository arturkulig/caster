describe("toNumber", ()=> {
    var {toNumber} = caster;
    it("exists", ()=> {
        expect(typeof toNumber).toBe("function");
    });
    it("passes number", ()=> {
        expect(toNumber(2)).toBe(2);
        expect(toNumber(0)).toBe(0);
    });
    it("rejects NaN", ()=> {
        expect(toNumber(NaN)).toBe(0);
        expect(toNumber('foo')).toBe(0);
    });
    it("gets radix 10 int from string ", ()=> {
        expect(toNumber(" 3")).toBe(3);
    });
    it("gets radix 10 float from string ", ()=> {
        expect(toNumber(" 3.5")).toBe(3.5);
        expect(toNumber(" 3,5 ")).toBe(3.5);
    });
    it("gets hex from string", ()=> {
        expect(toNumber("0xff")).toBe(255);
        expect(toNumber("#ff")).toBe(255);
    });
    it("gets value of an object if available", ()=> {
        expect(toNumber(new Date)).toBe(Date.now());
    });
});
