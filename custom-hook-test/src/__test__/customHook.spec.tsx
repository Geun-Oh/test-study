import useTest from "../hooks/useTest";
import { render } from "@testing-library/react";

test("isOpen의 초깃값은 false다", () => {
  let result = {} as ReturnType<typeof useTest>;

  const Wrapper = () => {
    result = useTest();
    return null;
  };

  render(<Wrapper />);
  expect(result.isOpen).toBe(false);
});
