import styled from "styled-components";
import { device } from "../../styles/RWDPointSettings";

const StyledFeature = styled.span`
  display: flex;
  min-width: 3rem;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 1rem;
  gap: 1rem;

  & img {
    width: 5rem;
    height: 5rem;

    ${device.mobileL} {
      width: 4rem;
      height: 4rem;
    }
  }
`;

//需求  Icon要有辦法辨別key來做轉換 比如 山景：海景   三床 兩床
//下方的文字也一樣要有辦法按照value來做轉換

const keyToIcon = {
  face: (value) => (value === "山景" ? "./icon/mountainview.png" : "./icon/beachview.png"),
  hasTub: (value) => (value === "true" ? "./icon/bathtub.png" : null),
  roomType: (value) =>
    value === "兩人房"
      ? "./icon/twopeople.png"
      : value === "四人房"
      ? "./icon/fourpeople.png"
      : "./icon/sixpeople.png",

  hasBalcony: (value) => (value === "true" ? "./icon/balcony.png" : null),
  numberOfBeds: (value) => {
    if (value === "兩中床") return "./icon/twoMbeds.png";
    if (value === "三中床") return "./icon/threeMbeds.png";
    if (value === "一大床") return "./icon/oneLbed.png";
    if (value === "兩大床") return "./icon/twoLbeds.png";
  },
  hasRefrigerator: (value) => (value === "true" ? "./icon/fridge.png" : null),
};

const valueToNewText = {
  hasTub: (value) => (value === "true" ? "浴缸" : null),
  hasBalcony: (value) => (value === "true" ? "陽台" : null),
  hasRefrigerator: (value) => (value === "true" ? "冰箱" : null),
};

const RoomFeature = ({ featuresArray }) => {
  const data = featuresArray.map(([key, value]) => {
    return {
      key,
      icon: keyToIcon[key] ? keyToIcon[key](value) : "",
      text: valueToNewText[key] ? valueToNewText[key](value) : value,
    };
  });

  return (
    <>
      {data.map((feature) => {
        if (!feature.icon) return null;
        return (
          <StyledFeature key={feature.key}>
            <img src={feature.icon} alt="" />
            <span>{feature.text}</span>
          </StyledFeature>
        );
      })}
    </>
  );
};

export default RoomFeature;
