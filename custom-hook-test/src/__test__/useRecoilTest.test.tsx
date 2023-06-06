import { renderHook } from "@testing-library/react-hooks";
import { RecoilRoot } from "recoil";
import useRecoilTest from "../hooks/useRecoilTest";
import React, { ReactNode } from "react";

// const Wrapper = ({ children }: { children: React.ReactNode }) => {
//   return <RecoilRoot>{children}</RecoilRoot>;
// };

test("useRecoilTest Test", () => {
  const { result } = renderHook(() => useRecoilTest(), {
    wrapper: ({ children }: { children: ReactNode }) => {
      return <RecoilRoot>{children}</RecoilRoot>;
    },
  });

  expect(result.current.num).toBe(0);
});
