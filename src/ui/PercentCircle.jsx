import { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";

const outerPadding = 20;

const Box = styled.div`
  position: relative;
  /* margin: 0 auto; */
  height: 100%;
  aspect-ratio: 1/1;
  height: 100%;
  /* transform: translateX(-50%); */

  & svg {
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100%;
    aspect-ratio: 1/1;
  }
`;

const Outer = styled.div`
  background-color: #d4e9eb;
  height: 100%;
  aspect-ratio: 1/1;
  border-radius: 50%;
  box-shadow: 6px 6px 10px -1px rgba(0, 0, 0, 0.15), -6px -6px 10px -1px rgba(255, 255, 255, 0.7);
  /* html {
  font-size: 62.5%;  // 原本 1rem = 16px  62.5% = 10px/16px 改為 1rem =10px
  } */
  padding: 20px;
  position: relative;
`;

const Inner = styled.div`
  /* height: 12rem;
  width: 12rem; */
  background-color: white;
  height: 100%;
  aspect-ratio: 1/1;
  border-radius: 50%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: inset 4px 4px 6px -1px rgba(0, 0, 0, 0.2), inset -4px -4px 6px -1px rgba(255, 255, 255, 0.27),
    -0.5px -0.5px 0px rgba(255, 255, 255, 1), 0.5px 0.5px 0px -1px rgba(0, 0, 0, 0.15),
    0px 12px 10px -10px rgba(0, 0, 0, 0.05);
`;

const Number = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: 600;
  font-size: 2.5rem;
  letter-spacing: 0.25rem;
  color: #39a1ce;
`;

const animateCircel = ($number, $dashOffsetNum) => keyframes`
0%{stroke-dashoffset:$dashOffsetNum; }
100%{stroke-dashoffset: ${$dashOffsetNum - ($number / 100) * $dashOffsetNum};   }
`;

const StyledCircel = styled.circle`
  fill: none;
  stroke: url(#GradientColor);
  stroke-width: ${(props) => props.$outerPadding};
  stroke-dasharray: ${(props) => props.$dasharrayNum};
  stroke-dashoffset: ${(props) => props.$dashOffsetNum};
  animation: ${(props) => animateCircel(props.$number, props.$dashOffsetNum)} ${(props) => props.$second}s
    linear forwards;
`;

const PercentCircle = ({ number = 40, second = 1 }) => {
  const counterRef = useRef(0);
  const outerRef = useRef(null);
  const svgRef = useRef(null);
  const [r, setR] = useState(0);

  const calculateDashValues = () => {
    const dasharrayNum = Math.PI * r * 2; // 設置為圓形的周長
    const dashOffsetNum = dasharrayNum;
    return { dasharrayNum, dashOffsetNum };
  };

  const { dasharrayNum, dashOffsetNum } = calculateDashValues();

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (counterRef.current === number) {
        clearInterval(intervalId);
      } else {
        counterRef.current = counterRef.current + 1;
        document.getElementById("numberDom").innerText = `${counterRef.current}%`;
      }
      const outerRefPosition = outerRef.current.getBoundingClientRect();
      // svg r (半徑)的設定是： Outer的高度一半 - stroke寬度的一半（stroke寬度 ＝ outerPadding)
      setR(outerRefPosition.height / 2 - outerPadding / 2);
    }, (second * 1000) / number);

    return () => clearInterval(intervalId);
  }, [second, number]);
  return (
    <Box ref={outerRef}>
      <Outer>
        <Inner>
          <Number id="numberDom">{counterRef.current}%</Number>
        </Inner>
      </Outer>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" ref={svgRef}>
        <defs>
          <linearGradient id="GradientColor">
            <stop offset="0%" stopColor={number >= 30 ? "#2986d8" : "#dc234b"} />
            <stop offset="100%" stopColor={number >= 30 ? "#04c1f5" : "#ba12ba"} />
          </linearGradient>
        </defs>
        <StyledCircel
          //中心的設定是  圓的半徑＋上下padding  再移動畫筆寬度的一半
          cx={r + (outerPadding / 2) * 2 - 10}
          cy={r + (outerPadding / 2) * 2 - 10}
          r={r}
          transform={`rotate(-90,${r + (outerPadding / 2) * 2 - 10}, ${r + (outerPadding / 2) * 2 - 10})`}
          $outerPadding={outerPadding}
          $dasharrayNum={dasharrayNum}
          $dashOffsetNum={dashOffsetNum}
          $second={second}
          $number={number}
          strokeLinecap="round"
        />
      </svg>
    </Box>
  );
};

export default PercentCircle;

// "translate(-75, -125) rotate(-90)"
