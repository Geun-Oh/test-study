import useTest from "../hooks/useTest";
import { renderHook, act } from "@testing-library/react-hooks";

test("setIsOpen을 이용해 내부 상태를 변경해줄 수 있다.", () => {
  const { result } = renderHook(() => useTest());

  act(() => {
    result.current.setIsOpen((prev) => !prev);
  });

  expect(result.current.isOpen).toBe(true);
});
