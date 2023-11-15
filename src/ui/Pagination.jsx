import { useSearchParams } from "react-router-dom";
import ButtonIcon from "./ButtonIcon";
import { HiChevronRight, HiChevronDoubleRight, HiChevronLeft, HiChevronDoubleLeft } from "react-icons/hi";
import styled from "styled-components";
// import useNumRowsPerPage from "../hooks/useNumRowsPerPage";

const PaginationLayout = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 2rem;
`;

const Pagination = ({ NumRowsPerPage, dataLength }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  // const { NumRowsPerPage } = useNumRowsPerPage();
  const totalPage = Math.ceil(dataLength / NumRowsPerPage);

  const currentPage = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  function nextPage() {
    searchParams.set("page", currentPage + 1 > totalPage ? currentPage : currentPage + 1);
    setSearchParams(searchParams);
  }
  function prevPage() {
    searchParams.set("page", currentPage - 1 === 0 ? currentPage : currentPage - 1);
    setSearchParams(searchParams);
  }
  function firstPage() {
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  }
  function lastPage() {
    searchParams.set("page", totalPage);
    setSearchParams(searchParams);
  }

  if (totalPage <= 1) return null;

  return (
    <PaginationLayout>
      {currentPage !== 1 && (
        <ButtonIcon type="paginationButton" onClick={firstPage}>
          <HiChevronDoubleLeft />
          <span>第一頁</span>
        </ButtonIcon>
      )}

      {currentPage !== 1 && (
        <ButtonIcon type="paginationButton" onClick={prevPage}>
          <HiChevronLeft />
          <span>上一頁</span>
        </ButtonIcon>
      )}
      {currentPage !== totalPage ? (
        <ButtonIcon type="paginationButton" onClick={nextPage}>
          <span>下一頁</span>
          <HiChevronRight />
        </ButtonIcon>
      ) : (
        <ButtonIcon type="paginationButton" notshow="true">
          <span>下一頁</span>
          <HiChevronRight />
        </ButtonIcon>
      )}

      {currentPage !== totalPage ? (
        <ButtonIcon type="paginationButton" onClick={lastPage}>
          <span>最後一頁</span>
          <HiChevronDoubleRight />
        </ButtonIcon>
      ) : (
        <ButtonIcon type="paginationButton" notshow="true" onClick={lastPage}>
          <span>最後一頁</span>
          <HiChevronDoubleRight />
        </ButtonIcon>
      )}
    </PaginationLayout>
  );
};

export default Pagination;
