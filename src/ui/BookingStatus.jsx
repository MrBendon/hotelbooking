import styled, { css } from "styled-components";
import { device } from "../styles/RWDPointSettings";

const statusList = {
  confirmed: css`
    background-color: #2aac6f;
  `,
  checkedIn: css`
    background-color: #3d90e9;
  `,
  noShow: css`
    background-color: #cdcdcd;
  `,
  pending: css`
    background-color: #e29191;
  `,
  checkedOut: css`
    background-color: #91c6e2;
  `,
};

const labelList = {
  confirmed: "訂單已確認，尚未入住",
  checkedIn: "已入住",
  noShow: "逾期未報到",
  pending: "訂單未確認",
  checkedOut: "已退房",
};

const Tag = styled.div`
  color: white;
  width: fit-content;
  border-radius: 1rem;
  padding: 0 1rem;
  ${(props) => statusList[props.status]}
  ${device.laptop} {
    padding: 0 0.25rem;
  }
`;

const StatusTag = ({ status, label }) => {
  return <Tag status={status}>{labelList[label]}</Tag>;
};

export default StatusTag;
