describe("toObject", function () {
    var {toObject, toString} = caster;
    it("exists", function () {
        expect(typeof toObject).toBe('function');
    });
    describe("casts", function () {
        it("undefined", function () {
            expect(toObject()).toEqual({});
        });
        it("null", function () {
            expect(toObject(null)).toEqual({});
        });
        it("string", function () {
            expect(toObject("caster").valueOf()).toBe("caster");
            expect(toObject("caster").toString()).toBe("caster");
            expect(toString(toObject("caster"))).toBe("caster");
        });
        it("number", function () {
            expect(toObject(2).valueOf()).toBe(2);
            expect(toObject(2).toString()).toBe("2");
            expect(toObject(3) > toObject(2)).toBe(true);
        });
        it("object", function () {
            var test_subject = {};
            expect(toObject(test_subject)).toBe(test_subject);
        });
        it("array", function () {
            expect(toObject(["a", "b"])).toEqual({"0": "a", "1": "b"});
        });
        it("map", function () {
            var m = new Map();
            m.set("a", 1);
            m.set("2", 1);
            m.set({}, 2);
            m.set(null, 3);
            expect(toObject(m)).toEqual({"a": 1, "2": 1, "{}": 2});
        });
    })
});
