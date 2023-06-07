import { useState } from "react";

const useTest = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return {
    isOpen,
    setIsOpen,
  };
};

export default useTest;
