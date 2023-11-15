import styled from "styled-components";
import { HiOutlineUser } from "react-icons/hi2";
import useUser from "../features/log-in-out/useUser";
import Button from "./Button";
import Modal from "./Modal";
import ComfirmBox from "./ComfirmBox";
import useLogout from "../features/log-in-out/useLogout";
import Spinner from "./Spinner";
import { device } from "../styles/RWDPointSettings";

const StyledHeader = styled.header`
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4rem;
  padding: 2.5rem;

  /* position: relative; */
  ${device.tablet} {
    position: ${(props) => (props.$isIntersecting ? "relative" : "fixed")};
    left: 0;
    top: 0;
    background-color: white;
    width: 100dvw;
    z-index: 2;
  }
`;

const Avatars = styled.img`
  width: 3rem;
  aspect-ratio: 1/1;
  border-radius: 5px;
`;

const Header = ({ isIntersecting }) => {
  const { data, isLoading: isLoadingUser } = useUser();
  const { logout, isLoading: isLogouting } = useLogout();
  // console.log(data);
  const userName = data?.user_metadata.userName || data?.email.split("@").at(0);
  const hasAvatars = data?.user_metadata.avatarsPath || false;
  // console.log(userName);

  if (isLoadingUser || isLogouting) return <Spinner />;

  return (
    <StyledHeader $isIntersecting={isIntersecting}>
      <span>Hi, {userName}</span>

      {hasAvatars ? <Avatars src={data.user_metadata.avatarsPath} /> : <HiOutlineUser />}

      <Modal>
        <Modal.OpenButton openWindowName="logout">
          <Button type="filterButton">登出 Log out</Button>
        </Modal.OpenButton>
        <Modal.Window name="logout">
          <ComfirmBox title="確定要登出？" comfirmedFn={logout}></ComfirmBox>
        </Modal.Window>
      </Modal>
    </StyledHeader>
  );
};

export default Header;
