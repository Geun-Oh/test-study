import React, { useState } from "react";

const Counter = () => {
  const [num, setNum] = useState<number>(2023);

  return (
    <>
      <span role="span">{num}</span>
      <button
        type="button"
        onClick={() => setNum((prev) => prev + 1)}
        name="plus"
      >
        +
      </button>
      <button
        type="button"
        onClick={() => setNum((prev) => prev - 1)}
        name="minus"
      >
        -
      </button>
    </>
  );
};

export default Counter;
