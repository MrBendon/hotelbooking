import styled, { css } from "styled-components";
import useQueryBookings from "../features/bookings/useQueryBookings";
import Spinner from "../ui/Spinner";
import BookingTable from "../ui/BookingTable";
import BookingRow from "../features/bookings/BookingRow";
import { Outlet, useNavigate, useParams, useSearchParams } from "react-router-dom";
import ButtonIcon from "../ui/ButtonIcon";
import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
import Filter from "../ui/Filter";
import Button from "../ui/Button";
import { useState } from "react";
import Pagination from "../ui/Pagination";
import useNumRowsPerPage from "../hooks/useNumRowsPerPage";
import InputSearch from "../ui/InputSearch";
import { DescByStartDate } from "../utils/helpers";
import { device } from "../styles/RWDPointSettings";

const BookingLayout = styled.section`
  display: flex;
  background-color: var(--color-grey-100);
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  padding: 2rem;
`;

const BookingCommonDiv = styled.div`
  width: 100%;
  background-color: var(--color-grey-0);
  padding: 1rem;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 2rem;
  justify-content: ${(props) => (props.justifycontent ? props.justifycontent : "space-between")};
`;

const OperatorRow = styled(BookingCommonDiv)`
  gap: 1rem;

  ${device.laptop} {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  ${device.tablet} {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`;

const AnimatedDiv = styled.div`
  width: 0;
  transition: width 0.5s ease-in-out;

  ${(props) =>
    props.openfiltername === props.filtername &&
    css`
      width: max-content;
      visibility: visible;
    `}
`;

const statusFilterOptions = [
  { label: "全部", value: "" },
  { label: "訂單未確認", value: "pending" },
  { label: "訂單已確認，尚未入住", value: "confirmed" },
  { label: "已入住", value: "checkedIn" },
  { label: "已退房", value: "checkedOut" },
  { label: "逾期未出現", value: "noShow" },
];

const isPaidFilterOptions = [
  { label: "全部", value: "" },
  { label: "已付款", value: "true" },
  { label: "未付款", value: "false" },
];

const ShowOnTablet = styled.span`
  display: none;

  ${device.laptop} {
    display: inline-block;
  }
`;

const Bookings = () => {
  const { NumRowsPerPage, isLoading: isLoadingNumRowsPerPage } = useNumRowsPerPage();
  let { data: bookings, isLoading } = useQueryBookings();
  console.log(bookings);
  bookings = bookings.sort((a, b) => {
    return a.startDate - b.startDate;
  });
  const [searchParams] = useSearchParams();
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [openFilterName, setOpenFilterName] = useState("");
  const [searchString, setSearchString] = useState("");
  const [isAddNewBooking, setIsAddNewBooking] = useState(false);
  // console.log(bookingId);
  // console.log(bookings);

  let searchResults = searchString
    ? DescByStartDate(bookings?.filter((booking) => booking.guests.fullName.includes(searchString)))
    : DescByStartDate(bookings);

  const currentPage = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const from = (currentPage - 1) * NumRowsPerPage;
  const to =
    currentPage * NumRowsPerPage - 1 > searchResults?.length
      ? searchResults?.length - 1
      : currentPage * NumRowsPerPage - 1;

  let showBookings = searchResults?.slice(from, to + 1);

  if (isLoadingNumRowsPerPage || isLoading) return <Spinner />;

  function handleClickStatus() {
    if (openFilterName === "status") {
      setOpenFilterName("");
    } else {
      setOpenFilterName("status");
    }
  }

  function handleClickIsPaid() {
    if (openFilterName === "isPaid") {
      setOpenFilterName("");
    } else {
      setOpenFilterName("isPaid");
    }
  }

  return (
    <BookingLayout>
      <BookingCommonDiv>
        {/* 有訂單id時顯示以下內容 */}
        {bookingId && (
          <ButtonIcon onClick={() => navigate("/bookings")}>
            <HiOutlineArrowSmallLeft />
            <span>回訂單列表</span>
          </ButtonIcon>
        )}
        {isAddNewBooking ? (
          <ButtonIcon
            onClick={() => {
              navigate("/bookings");
              setIsAddNewBooking(false);
            }}
          >
            <HiOutlineArrowSmallLeft />
            <span>回訂單列表</span>
          </ButtonIcon>
        ) : (
          //不是在訂單詳情的時候顯示以下內容
          !bookingId && (
            <OperatorRow>
              <Button
                onClick={() => {
                  navigate("newbooking");
                  setIsAddNewBooking(true);
                }}
                type="addservice"
                style={{ marginRight: "auto" }}
              >
                後台新增訂單
              </Button>

              {/* 字串搜尋 */}
              <InputSearch setSearchString={setSearchString} searchString={searchString} />
              {searchString ? <strong>搜尋文字：{searchString}</strong> : null}

              <span>篩選器：</span>
              <ShowOnTablet></ShowOnTablet>
              <Button
                type={openFilterName === "status" ? "activeFilterButton" : "filterButton"}
                onClick={() => handleClickStatus()}
              >
                訂單狀態
              </Button>

              {openFilterName === "status" && (
                <AnimatedDiv openfiltername={openFilterName} filtername="status">
                  <Filter filterField="status" options={statusFilterOptions} />
                </AnimatedDiv>
              )}

              <Button
                type={openFilterName === "isPaid" ? "activeFilterButton" : "filterButton"}
                onClick={() => handleClickIsPaid()}
              >
                付款狀態
              </Button>
              {openFilterName === "isPaid" && (
                <AnimatedDiv openfiltername={openFilterName} filtername="isPaid">
                  <Filter filterField="isPaid" options={isPaidFilterOptions} />{" "}
                </AnimatedDiv>
              )}
            </OperatorRow>
          )
        )}
      </BookingCommonDiv>
      {isAddNewBooking && <Outlet context={{ isAddNewBooking, setIsAddNewBooking }}></Outlet>}
      {isAddNewBooking ? null : bookingId ? (
        <Outlet
          context={{ booking: bookings.filter((booking) => booking.id === Number(bookingId)) }}
        ></Outlet>
      ) : (
        <>
          <BookingTable columns={"repeat(2,1fr) 4fr repeat(4, 1fr)"}>
            <BookingTable.Header>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span style={{ order: 5, gridColumn: "span 3" }}>
                共 {searchResults.length} 筆資料 : 目前第 {from + 1} {to === from ? null : "~ "}
                {to === from ? null : to + 1} 筆資料
              </span>
            </BookingTable.Header>
            <BookingTable.Header>
              <span>訂單ID</span>
              <span>訂單姓名</span>
              <span>訂單摘要</span>
              <span>訂單狀況</span>
              <span>訂單金額</span>
              <span>付款狀態</span>
              <span></span>
            </BookingTable.Header>
            <BookingTable.Body
              datas={showBookings}
              render={(booking) => <BookingRow key={booking.id} booking={booking} />}
            ></BookingTable.Body>
          </BookingTable>
          <Pagination dataLength={searchResults.length} NumRowsPerPage={NumRowsPerPage} />
        </>
      )}
    </BookingLayout>
  );
};

export default Bookings;
