import { HiPlusSmall } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import Modal from "../../ui/Modal";
import RoomForm from "./RoomForm";

const AddRoom = () => {
  return (
    <Modal>
      <Modal.OpenButton openWindowName="add">
        <ButtonIcon type="add">
          <HiPlusSmall />
          新增
        </ButtonIcon>
      </Modal.OpenButton>
      <Modal.Window name="add">
        <RoomForm />
      </Modal.Window>
    </Modal>
  );
};

export default AddRoom;
