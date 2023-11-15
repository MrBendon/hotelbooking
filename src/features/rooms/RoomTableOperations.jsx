import styled from "styled-components";
import Filter from "../../ui/Filter";

const StyledTableOperation = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
`;

const RoomTableOperations = () => {
  return (
    <StyledTableOperation>
      <Filter></Filter>
    </StyledTableOperation>
  );
};

export default RoomTableOperations;
