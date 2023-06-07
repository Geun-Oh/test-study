import { useEffect, useState } from "react";

const useEffectTest = ({ initialNum = 2023 }: { initialNum: number }) => {
  const [num, setNum] = useState<number>(initialNum);

  useEffect(() => {
    if (initialNum) {
      setNum(initialNum);
    }
  }, [initialNum]);

  return {
    num,
    setNum,
  };
};

export default useEffectTest;
