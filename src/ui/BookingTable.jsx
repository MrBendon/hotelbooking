import { createContext, useContext } from "react";
import styled from "styled-components";
import { device } from "../styles/RWDPointSettings";

const Table = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-radius: 5px;
  padding: 2rem;
  background-color: white;
`;

const StyledHeader = styled.header`
  width: 100%;
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  align-items: center;
  justify-items: center;
  padding: 1rem;
  border-bottom: 1px solid var(--color-grey-400);
  font-weight: 600;

  ${device.laptop} {
    display: none;
  }
`;

const StyledBody = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const StyledRow = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: ${({ columns }) => columns};
  align-items: center;
  justify-items: center;
  padding: 1.75rem 1rem;
  border-bottom: 1px solid var(--color-grey-200);

  &:hover {
    /* cursor: pointer; */
    background-color: var(--color-grey-50);
  }

  ${device.laptop} {
    grid-template-columns: repeat(6, 1fr);
    /* grid-template-rows: 1fr 1fr 1fr; */
    gap: 1rem;
    padding: 2rem 1rem;
    margin: 1rem 0;
  }
`;

const StyledDataTitle = styled.span`
  display: none;

  ${device.laptop} {
    display: inline-block;
    font-weight: 900;
  }
`;

const EmptyData = styled.div`
  padding: 2rem;
  color: var(--color-grey-300);
  font-weight: 600;
  font-size: 3rem;
`;

const StyledDetail = styled.div`
  width: 100%;
  height: 5rem;
  background-color: yellow;
`;

const StyledHide = styled.div`
  display: block;
  ${device.laptop} {
    display: none;
  }
`;

const BookingLayout = createContext();

const BookingTable = ({ children, columns }) => {
  // const [openId, setOpenId] = useState("");
  // const closeFn = () => setOpenId("");
  // const openFn = setOpenId;
  return (
    <BookingLayout.Provider value={{ columns }}>
      <Table>{children}</Table>
    </BookingLayout.Provider>
  );
};

const Header = ({ children }) => {
  const { columns } = useContext(BookingLayout);

  return <StyledHeader columns={columns}>{children}</StyledHeader>;
};

const TableBody = ({ datas = [], render }) => {
  // if (!datas.length) return <TableEmptyData />
  return <StyledBody>{datas.length ? datas.map(render) : <Empty />}</StyledBody>;
};

const Row = ({ children, onClick }) => {
  const { columns } = useContext(BookingLayout);
  return (
    <StyledRow role="row" columns={columns} onClick={onClick}>
      {children}
    </StyledRow>
  );
};

const Empty = () => {
  return <EmptyData>目前尚無訂單資料</EmptyData>;
};

const Detail = ({ children }) => {
  return <StyledDetail>{children}</StyledDetail>;
};

const DataTitle = ({ children }) => {
  return <StyledDataTitle>{children}</StyledDataTitle>;
};

const Hide = ({ children }) => {
  return <StyledHide>{children}</StyledHide>;
};

BookingTable.Header = Header;
BookingTable.Body = TableBody;
BookingTable.Row = Row;
BookingTable.Detail = Detail;
BookingTable.DataTitle = DataTitle;
BookingTable.Hide = Hide;

export default BookingTable;
