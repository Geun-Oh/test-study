import { useState } from "react";
import "./App.css";
import { RecoilRoot } from "recoil";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <RecoilRoot>
        <>hello</>
      </RecoilRoot>
    </>
  );
}

export default App;
