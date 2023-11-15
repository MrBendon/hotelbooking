import styled from "styled-components";

const StyledProgressBar = styled.div`
  width: 100%;
  height: 1.5rem;
  display: grid;
  grid-template-columns: repeat(${(props) => props.totalstep}, 1fr);
  background-color: var(--color-grey-100);
  border-radius: 5rem;
  /* gap: 0.5rem; */
  align-items: center;

  & :last-child {
    border-radius: 0 5rem 5rem 0;
  }
  & :first-child {
    border-radius: 5rem 0 0 5rem;
  }
`;

const StyledBar = styled.div`
  width: 100%;
  height: 100%;
  /* border: 1px solid var(--color-grey-300); */
  background-color: ${(props) => (props.nowstep >= props.value ? "var(--color-blue)" : "transparent")};
  clip-path: polygon(2.5% 0, 100% 0%, 97.5% 100%, 0% 100%);
  &:first-child {
    clip-path: polygon(0 0, 100% 0%, 97.5% 100%, 0% 100%);
  }
  &:last-child {
    clip-path: polygon(2.5% 0%, 100% 0%, 100% 100%, 0% 100%);
  }
`;

const ProgressBar = ({ totalstep, nowstep = 1 }) => {
  const stepArray = Array.from({ length: totalstep }, (num, i) => i);
  return (
    <StyledProgressBar totalstep={totalstep}>
      {stepArray.map((i) => (
        <StyledBar nowstep={nowstep - 1} value={i} key={i}></StyledBar>
      ))}
    </StyledProgressBar>
  );
};

export default ProgressBar;
