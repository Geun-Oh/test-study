import { sum, multifly } from "../src/sum";

test("add 1 + 2 to equal 3", () => {
    expect(sum({a: 1, b: 2})).toBe(3);
});

describe("add or multifly total 3 times", () => {
    it("add 1 and 2 equals 3", () => {
        expect(sum({a: 1, b: 2})).toBe(3);
    });

    it("add 3 and 4 equals 7", () => {
        expect(sum({a: 1, b: 2})).toBe(3);
    });

    it("multifly 2 and 9 equals 18", () => {
        expect(multifly({a: 2, b: 9})).toBe(18);
    });
})