import { useRooms } from "../../features/rooms/useRooms";
import Menus from "../../ui/Menus";
import TableLayout from "../../ui/TableLayout";
import RoomRow from "./roomRow";
import Spinner from "../../ui/Spinner";
import AddRoom from "./AddRoom";

const RoomTable = () => {
  const { data: rooms, isLoading } = useRooms();
  if (isLoading) return <Spinner></Spinner>;
  //   console.log(rooms, isLoading, error);
  // const newDataId = rooms
  //   ? rooms.reduce((previouItem, curItem) => {
  //       console.log(previouItem, curItem.id);
  //       return Math.max(previouItem, curItem.id);
  //     }, 0) + 1
  //   : 1;
  // console.log(newDataId);

  return (
    <Menus>
      <TableLayout columns="2fr 1.5fr 1fr 1fr 1fr 1fr .5fr">
        <TableLayout.OperaterRow>
          <AddRoom />
        </TableLayout.OperaterRow>
        <TableLayout.Header>
          <div>圖片</div>
          <div>房間名稱</div>
          <div>可入住人數</div>
          <div>房間價格</div>
          <div>折扣價格</div>
          <div>該房型數量</div>
          <div></div>
        </TableLayout.Header>
        <TableLayout.Body
          datas={rooms}
          render={(room) => <RoomRow room={room} key={room.id} />}
        ></TableLayout.Body>
      </TableLayout>
    </Menus>
  );
};

export default RoomTable;
