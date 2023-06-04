import useTest from "../hooks/useTest";
import { renderHook } from "@testing-library/react-hooks";

test("isOpen의 초깃값은 false다", () => {
  const { result } = renderHook(() => useTest());
  expect(result.current.isOpen).toBe(false);
});
