import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { device } from "../styles/RWDPointSettings";

const FiltersBox = styled.div`
  display: flex;
  align-items: center;

  ${device.laptop} {
    display: grid;
    grid-template-columns: repeat(2, 50%);
  }

  ${device.tablet} {
    display: grid;
    grid-template-columns: repeat(2, 50%);
  }

  ${device.mobileL} {
    display: flex;
    flex-direction: column;
  }
`;

const StyledButton = styled.button`
  background-color: ${(props) => (props.searchparams === props.value ? "#2c6ebe" : "#f4f4f4")};
  border-radius: 5px;
  color: ${(props) => (props.searchparams === props.value ? "#f4f4f4" : "var(--color-grey-400)")};
  padding: 0.25rem 1.25rem;
  border: 1px solid var(--color-grey-400);
  font-size: 1.5rem;
  margin: 0 0.15rem;
  /* box-shadow: ${(props) => (props.searchparams === props.value ? "1px 1px  3px black inset" : "none")}; */

  &:focus {
    outline: none;
  }
  &:active {
    color: white;
    background-color: #2c6ebe;
  }

  ${device.tablet} {
    width: 100%;
    font-size: 1.25rem;
  }
`;

function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField);

  function handleClickFilter(value) {
    searchParams.set(filterField, value);
    setSearchParams(searchParams);
  }

  return (
    <FiltersBox>
      {options.map((option) => {
        return (
          <StyledButton
            searchparams={currentFilter}
            value={option.value}
            key={option.value}
            onClick={() => handleClickFilter(option.value)}
          >
            {option.label}
          </StyledButton>
        );
      })}
    </FiltersBox>
  );
}

export default Filter;
