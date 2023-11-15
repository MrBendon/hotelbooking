import styled from "styled-components";
import TableLayout from "../../ui/TableLayout";
import { HiPencil, HiTrash } from "react-icons/hi2";
import IconTextButton from "../../ui/IconTextButton";
import RoomFeature from "./RoomFeature";
import RoomForm from "./RoomForm";
import Modal from "../../ui/Modal";
import DeleteRoom from "./DeleteRoom";

const Img = styled.img`
  display: block;
  width: 16rem;
  border-radius: 1rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transition: all 0.3s;
`;

const SmallImg = styled.img`
  display: block;
  width: 10rem;
  border-radius: 1rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
`;

const RoomRow = ({ room }) => {
  // console.log(room);
  const featuresArray = Object.entries(room.roomFeatures);
  // console.log(featuresArray);
  // const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Modal>
        <TableLayout.Row>
          <Img src={room.roomPrimayPhoto || room.roomPhotos.at(0)}></Img>
          <div>{room.name}</div>
          <div>{room.maxCapacity}人</div>
          <div>{room.regularPrice}</div>
          <div>{room.discount ? room.discount : "-"}</div>
          <div>{room.numRooms}間</div>
          <div>
            <TableLayout.ToggleButton clickId={room.id} />
          </div>
          <TableLayout.SubRow id={room.id}>
            <div>房間樓層</div>
            <TableLayout.SpanCol span={2}>{room.floor}</TableLayout.SpanCol>
            <div>房間大小</div>
            <TableLayout.SpanCol span={3}>{room.squareMeters}平方公尺</TableLayout.SpanCol>
            <div>房間特色</div>
            {/* <TableLayout.FullRow> {room.roomFeatures.face} </TableLayout.FullRow> */}
            <TableLayout.FullRow>
              <RoomFeature featuresArray={featuresArray}>1</RoomFeature>
            </TableLayout.FullRow>

            <span></span>
            <div>房間描述</div>

            <TableLayout.FullRow>{room.roomDescription} </TableLayout.FullRow>
            <span></span>
            <div>房間照片</div>
            <TableLayout.FullRow>
              {room.roomPhotos.map((url) => (
                <SmallImg key={url} src={url}></SmallImg>
              ))}
            </TableLayout.FullRow>
            <TableLayout.RowFooter>
              <Modal.OpenButton openWindowName="edit">
                <IconTextButton icon={<HiPencil />}>編輯</IconTextButton>
              </Modal.OpenButton>

              <Modal.OpenButton openWindowName="delete">
                <IconTextButton icon={<HiTrash />}>刪除</IconTextButton>
              </Modal.OpenButton>
            </TableLayout.RowFooter>
          </TableLayout.SubRow>
        </TableLayout.Row>
        {/* 進到表單 */}
        <Modal.Window name="edit">{<RoomForm room={room} />}</Modal.Window>
        <Modal.Window name="delete">{<DeleteRoom room={room} />}</Modal.Window>
      </Modal>
    </>
  );
};

export default RoomRow;
