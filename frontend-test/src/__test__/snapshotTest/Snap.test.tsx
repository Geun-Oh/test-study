import { render } from "@testing-library/react";
import Snap from "../../Components/Snap";
import React from "react";

test("현재 생성된 스냅샷이 기존의 스냅샷과 동일한지 확인합니다.", () => {
  const el = render(<Snap innerText="스냅샷 테스트?" />);
  expect(el).toMatchSnapshot();
});
