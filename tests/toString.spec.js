describe("toString", function () {
    var {toString} = caster;
    it("exists", function () {
        expect(typeof toString).toBe("function");
    });
    it("bypasses a string", function () {
        expect(toString("")).toBe("");
        expect(toString("caster")).toBe("caster");
    });
    describe("stringifies", function () {
        it("undefined to empty string", function () {
            expect(toString()).toBe('');
            expect(toString(null)).toBe('');
        });
        it("number", function () {
            expect(toString(42)).toBe("42");
            expect(toString(0)).toBe("0");
            expect(toString(1 / 0)).toBe("Infinity");
            expect(toString(0xfe)).toBe("254");
            expect(toString(NaN)).toBe("");
        });
        it("booleans", function () {
            expect(toString(false)).toBe("false");
            expect(toString(true)).toBe("true");
        });
        it("objects", function () {
            var beginningOfEverything = new Date(0);
            expect(toString(beginningOfEverything)).toBe(beginningOfEverything.toLocaleString());
            expect(toString({valueOf: ()=>2})).toBe('2');
            expect(toString({})).toBe('{}');
        });
    })
});
