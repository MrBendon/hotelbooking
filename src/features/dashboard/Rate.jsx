import styled from "styled-components";
import PercentCircle from "../../ui/PercentCircle";

const Layout = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: space-around;
  gap: 1;
`;

const StyledCircleBox = styled.div`
  /* margin: 0 auto; */
  /* width: 100%; */
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyldH4 = styled.h4`
  padding: 1rem 0;
`;

const Rate = ({ rate }) => {
  //   console.log(rate);
  return (
    <Layout>
      <StyldH4>今日入住率 Occupancy Rate</StyldH4>
      <StyledCircleBox>
        <PercentCircle number={rate ? rate : 0}></PercentCircle>
      </StyledCircleBox>
    </Layout>
  );
};

export default Rate;
