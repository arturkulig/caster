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
        it("undefined", function () {
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
        it("boolean", function () {
            expect(toString(false)).toBe("false");
            expect(toString(true)).toBe("true");
        });
        it("object", function () {
            var beginningOfEverything = new Date(0);
            expect(toString(beginningOfEverything)).toBe(beginningOfEverything.toLocaleString());
            expect(toString({valueOf: ()=>2})).toBe('2');
            expect(toString({})).toBe('{}');
            expect(toString({a:{b:"c"}})).toBe('{\n  "a": {\n    "b": "c"\n  }\n}');
        });
        it("array", function () {
            var beginningOfEverything = new Date(0);
            expect(toString([])).toBe('');
            expect(toString(['a', 2])).toBe('a, 2');
            expect(toString(['a', 2, beginningOfEverything])).toBe('a, 2, ' + beginningOfEverything.toLocaleString());
        });
        it("map", function () {
            var m = new Map();
            m.set(1, 1);
            m.set("a", 2);
            m.set(null, 3);
            m.set(false, 4);
            expect(toString(m)).toBe('{\n  "1": 1,\n  "a": 2,\n  "false": 4\n}');
        });
    })
});
