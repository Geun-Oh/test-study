const mockfn = jest.fn();

test("test mocking function", () => {
    expect(mockfn()).toBe(undefined);
});

const mockfn2 = jest.fn();

mockfn2.mockReturnValue("left and right");

test("test mockReturnValue", () => {
    expect(mockfn2()).toBe("left and right");
});

const mockfn3 = jest.fn();
mockfn3.mockImplementation((name) => `My name is ${name}!`);

test("test mockImplementation", () => {
    expect(mockfn3("geun")).toBe("My name is geun!");
});