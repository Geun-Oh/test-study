import { useRecoilState } from "recoil";
import atomState from "../recoil/atom";

const useRecoilTest = () => {
  const [num, setNum] = useRecoilState(atomState);

  return {
    num,
    setNum,
  };
};

export default useRecoilTest;
