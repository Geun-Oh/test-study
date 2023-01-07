const calculator = {
    hello: () => console.log("hello everyone!")
}

const spyfn = jest.spyOn(calculator, "hello")

test("Let's test spyOn", () => {
    expect(spyfn).toBeCalledTimes(1)
})