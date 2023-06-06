import React, { useState } from "react";
import "./App.css";
import { RecoilRoot } from "recoil";
import Counter from "./Components/Counter";

function App() {
  return (
    <>
      <RecoilRoot>
        <>hello</>
        <Counter />
      </RecoilRoot>
    </>
  );
}

export default App;
