import { render, screen } from "@testing-library/react";
import Text from "../../Components/Text";
import "@testing-library/jest-dom";
import React from "react";

const exampleInnerText = "테스트 텍스트입니다!";

test("예시 텍스트를 innerText로 넣으면 예시 텍스트가 렌더링된다.", () => {
  render(<Text innerText={exampleInnerText} />);
  const textEl = screen.getByText(exampleInnerText); // span 은 getbyrole로 불러올 수 있는 적합한 role이 없어서 role='span' 속성을 추가하거나, 다른 getBy를 사용해야한다.
  expect(textEl).toBeInTheDocument();
});
