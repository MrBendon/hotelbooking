import styled from "styled-components";
import Button from "../../ui/Button";
import Danger from "../../assets/warning.png";
import { useDeleteRoom } from "./useDeleteRoom";

const DeleteBox = styled.div`
  padding: 0rem 3rem;
  width: 25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
`;

const Iconbox = styled.img`
  width: 10rem;
  height: 10rem;
  border-radius: 1rem;
  object-fit: cover;
  object-position: center;
`;

const Heading = styled.h3`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const AnswerRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const DeleteRoom = ({ room, onCloseModal }) => {
  console.log(room);

  const { deleteData } = useDeleteRoom();

  function deleteFn() {
    console.log("刪除");
    deleteData(room);
    onCloseModal();
  }

  return (
    <DeleteBox>
      <Iconbox src={Danger}></Iconbox>
      <Heading>
        確定要刪除 <br />
        <strong>[ {room.name} ]</strong>
        這筆資料？
      </Heading>
      <AnswerRow>
        <Button type="cancel" onClick={onCloseModal}>
          取消
        </Button>
        <Button type="confirm" onClick={deleteFn}>
          確定
        </Button>
      </AnswerRow>
    </DeleteBox>
  );
};

export default DeleteRoom;
