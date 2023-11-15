import styled from "styled-components";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { device, mediaQueries } from "../styles/RWDPointSettings";
import { useEffect, useRef, useState } from "react";

const StyleApplayout = styled.div`
  display: grid;
  grid-template-columns: 25rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100dvh;

  /* ${mediaQueries("laptopL")} {
    grid-template-columns: 19rem 1fr;
  } */

  ${device.laptop} {
    grid-template-columns: 22rem 1fr;
  }

  ${device.tablet} {
    display: flex;
    flex-direction: column;
  }
`;

const Main = styled.div`
  padding: 2rem;
  ${device.tablet} {
    padding: 1rem;
  }
`;

const DatumLine = styled.div`
  display: none;
  ${device.tablet} {
    display: block;
  }
`;

const Applayout = () => {
  const DatumLineRef = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(true);

  function handleIntersect(entries) {
    if (entries[0].boundingClientRect.y < 0) {
      setIsIntersecting(false);
    } else {
      setIsIntersecting(true);
    }
  }

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1,
    };
    let observer = new IntersectionObserver(handleIntersect, options);
    observer.observe(DatumLineRef.current);

    // return () => observer.unobserve(DatumLineRef);
  }, []);

  return (
    <StyleApplayout>
      <Sidebar></Sidebar>
      <DatumLine ref={DatumLineRef}></DatumLine>
      <Header isIntersecting={isIntersecting}></Header>
      <Main>
        <Outlet></Outlet>
      </Main>
    </StyleApplayout>
  );
};

export default Applayout;
