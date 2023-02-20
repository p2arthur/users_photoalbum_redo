import Button from "./Button";
import { IoTrashOutline } from "react-icons/io5";
import { deleteUser } from "../store";
import { useThunk } from "../hooks/useThunk";
import ExpandablePanel from "./ExpandablePanel";
import AlbumsList from "./AlbumsList";

function UsersListItem({ user }) {
  const [doDeleteUser, isLoading, error] = useThunk(deleteUser);

  const handleDeleteUser = () => {
    console.log(user);
    doDeleteUser(user);
  };

  const header = (
    <>
      <div className="flex items-center gap-3">
        <Button
          onClick={handleDeleteUser}
          className="bg-red-500 text-white rounded-full"
        >
          <IoTrashOutline />
        </Button>
        {user.username}
      </div>
    </>
  );

  return (
    <ExpandablePanel header={header}>
      <AlbumsList user={user} />
    </ExpandablePanel>
  );
}

export default UsersListItem;
