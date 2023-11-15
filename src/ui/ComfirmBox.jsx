import styled from "styled-components";
import Hint from "../assets/info.png";
import Warning from "../assets/warning.png";
import useClickOutSide from "../hooks/useClickOutSide";

const StyleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  padding: 2rem;
`;

const IMG = styled.img`
  margin-top: 3rem;
  width: 8rem;
  height: 8rem;
`;

const iconType = {
  danger: 1,
  warn: Warning,
  hint: Hint,
};

const CommonDiv = styled.div`
  display: flex;
  gap: 3rem;
`;

const Button = styled.button`
  width: 8rem;
  border: none;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
`;

const ComfirmBox = ({ type = "hint", title = "確認文本抬頭", onCloseModal, cancelFn, comfirmedFn }) => {
  const ref = useClickOutSide(onCloseModal);

  function handleClickCancel() {
    if (onCloseModal) {
      onCloseModal();
    } else {
      cancelFn();
    }
  }

  return (
    <StyleBox ref={ref}>
      <IMG src={iconType[type]} alt="hint" />

      <h3>{title}</h3>

      <CommonDiv>
        <Button onClick={() => handleClickCancel()} type="confirm">
          取消
        </Button>
        <Button onClick={() => comfirmedFn()} type="confirm">
          確認
        </Button>
      </CommonDiv>
    </StyleBox>
  );
};

export default ComfirmBox;
