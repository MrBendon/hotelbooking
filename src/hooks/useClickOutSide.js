import { useEffect, useRef } from "react";

// Fn是點到外面要幹嘛的
const useClickOutSide = (Fn) => {
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        // console.log("Click OutSide");
        Fn();
      }
    }

    document.addEventListener("click", handleClick, true);

    return () => document.removeEventListener("click", handleClick, true);
  }, [Fn]);

  return ref;
};

export default useClickOutSide;
