import { createContext, useContext, useState } from "react";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi2";
import styled from "styled-components";

const StyledTable = styled.div`
  background-color: var(--color-grey-50);
  font-size: 1.75rem;
  padding: 2rem 3rem;
  border-radius: 1rem;
  overflow: hidden;
`;

const StyledCommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2rem;
  padding: 1.5rem 2.5rem;
  align-items: center;
  justify-items: center;
  color: var(--color-grey-500);
`;

const StyledTableHeader = styled(StyledCommonRow)`
  font-weight: 600;
  color: var(--color-grey-600);
  border-bottom: 1px solid var(--color-grey-300);
`;

const StyledRow = styled(StyledCommonRow)`
  &:hover {
    border-radius: 1rem;
    background-color: var(--color-grey-100);
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-200);
  }
`;

const StyledSubRow = styled.div`
  width: 100%;
  grid-column: 1/-1;
  display: grid;
  grid-template-columns: ${(props) => (props.subColumns ? props.subColumns : props.columns)};
  column-gap: 2rem;
  row-gap: 5rem;
  padding: 3rem 0rem;
  align-items: center;
  justify-items: center;

  & div:nth-of-type(odd) {
    font-weight: 600;
    color: var(--color-grey-600);
  }
`;

const SpanCol = styled.div`
  grid-column: span ${(props) => props.span};
`;

const StyledFullRow = styled.div`
  width: 100%;
  grid-column: 2/-2;
  display: flex;
  gap: 3rem;
  flex-wrap: wrap;
`;

const StyledBody = styled.section`
  margin: 0.5rem 0;
`;

const EmptyDiv = styled.div`
  margin: 3rem 1rem;
`;

const StyleEmptyP = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
  text-align: center;
  color: var(--color-grey-400);
`;

const StyledButton = styled.button`
  border: none;
  background-color: var(--color-grey-200);
  padding: 1rem;
  border-radius: 50%;

  &:hover {
    background-color: var(--color-grey-300);
  }
  &:focus {
    outline: none;
  }
`;

const StyledOperaterRow = styled.div`
  grid-column: 1/-1;
  display: flex;
  gap: 3rem;
  align-items: center;
  justify-content: flex-end;
  padding: 2rem 2.5rem;
`;

const StyledRowFooter = styled.div`
  width: 100%;
  grid-column: 1/-1;
  padding: 3rem 2.5rem;
  /* background-color: orange; */
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 2rem;
`;

const TableLayoutContext = createContext();

const TableLayout = ({ children, columns, subColumns }) => {
  const [openId, setOpenId] = useState("");
  const closeFn = () => setOpenId("");
  const openFn = setOpenId;
  return (
    <TableLayoutContext.Provider value={{ openId, openFn, closeFn, columns, subColumns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableLayoutContext.Provider>
  );
};

function TableHeader({ children }) {
  const { columns } = useContext(TableLayoutContext);
  return (
    <StyledTableHeader as="header" columns={columns}>
      {children}
    </StyledTableHeader>
  );
}

function TableBody({ datas = [], render }) {
  if (!datas.length) return <TableEmptyData />;
  return <StyledBody>{datas.map(render)}</StyledBody>;
}

function TableRow({ children }) {
  const { columns } = useContext(TableLayoutContext);
  return (
    <StyledRow role="row" columns={columns}>
      {children}
    </StyledRow>
  );
}

function TableSubRow({ children, id }) {
  const { openId, columns, subColumns } = useContext(TableLayoutContext);
  if (id !== openId) return null;
  return (
    <StyledSubRow role="subrow" columns={columns} subColumns={subColumns}>
      {children}
    </StyledSubRow>
  );
}

function FullRow({ children }) {
  return <StyledFullRow role="subrow">{children}</StyledFullRow>;
}

function TableEmptyData() {
  return (
    <EmptyDiv>
      <StyleEmptyP>尚未有資料</StyleEmptyP>
    </EmptyDiv>
  );
}

function ToggleButton({ clickId }) {
  const { openId, openFn, closeFn } = useContext(TableLayoutContext);

  function handleClick(e) {
    e.stopPropagation();

    openId === "" || openId !== clickId ? openFn(clickId) : closeFn();
  }

  return (
    <StyledButton onClick={handleClick}>
      {openId === clickId ? <HiOutlineChevronUp /> : <HiOutlineChevronDown />}
    </StyledButton>
  );
}

function RowFooter({ children }) {
  return <StyledRowFooter>{children}</StyledRowFooter>;
}

function OperaterRow({ children }) {
  return <StyledOperaterRow>{children}</StyledOperaterRow>;
}

TableLayout.Header = TableHeader;
TableLayout.Body = TableBody;
TableLayout.Row = TableRow;
TableLayout.SubRow = TableSubRow;
TableLayout.SpanCol = SpanCol;
TableLayout.FullRow = FullRow;
TableLayout.RowFooter = RowFooter;
TableLayout.EmptyData = TableEmptyData;
TableLayout.ToggleButton = ToggleButton;
TableLayout.OperaterRow = OperaterRow;

export default TableLayout;
