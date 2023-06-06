import { renderHook } from "@testing-library/react-hooks";
import useEffectTest from "../hooks/useEffectTest";

describe("useEffect Test", () => {
  it("초기 선언 시 props를 1로 전달하면 initialNum이 1이어야 한다.", () => {
    const { result } = renderHook((props) => useEffectTest(props), {
      initialProps: {
        initialNum: 1,
      },
    });

    expect(result.current.num).toBe(1);
  });

  it("이후에 초기값을 2023으로 하여 리렌더 하면 초기값이 2023이어야 한다.", () => {
    const { result, rerender } = renderHook((props) => useEffectTest(props), {
      initialProps: {
        initialNum: 1,
      },
    });

    rerender({
      initialNum: 2023,
    });

    expect(result.current.num).toBe(2023);
  });
});
