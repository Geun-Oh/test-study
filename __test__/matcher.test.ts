import { bestLaCroixFlavor, can1, can2, getFalse, getTruth, throwError } from "../src/matcher";

test("the best flower is grapefruit", () => {
  expect(bestLaCroixFlavor()).toBe("grapefruit");
});

describe("the La Croix cans on my dest", () => {
  it("have all the same properties", () => {
    expect(can1).toEqual(can2);
  });

  it("are not the exact same can", () => {
    expect(can1).not.toBe(can2);
  });
});

describe("learn toBeTruthy and toBeFalsy", () => {
    it("return true", () => {
        expect(getTruth()).toBeTruthy();
    })

    it("return false", () => {
        expect(getFalse()).toBeFalsy();
    })
})

test("array", () => {
    const arr = ['Red', 'Yellow', 'Blue']
    expect(arr).toHaveLength(3);
    expect(arr).toContain('Blue');
    expect(arr).not.toContain('Purple');
});

describe("regax grapefruit", () => {
    test("mentions grapefruit", () => {
        expect(bestLaCroixFlavor()).toMatch(/grapefruit/);
        expect(bestLaCroixFlavor()).toMatch(new RegExp('grapefruit'));
    });
});

test('throws on grapefruit', () => {
    expect(() => {
        throwError();
    }).toThrow('gotAnError');
})