import Button from "./Button";
import { IoTrashOutline } from "react-icons/io5";
import { deleteUser } from "../store";
import { useThunk } from "../hooks/useThunk";

function UsersListItem({ user }) {
  const [doDeleteUser, isLoading, error] = useThunk(deleteUser);

  const handleDeleteUser = () => {
    doDeleteUser(user);
  };

  return (
    <div className="w-full rounded border mb-3 p-3 flex gap-5">
      <Button
        onClick={handleDeleteUser}
        className="bg-red-500 text-white rounded-full"
      >
        <IoTrashOutline />
      </Button>
      {user.username}
    </div>
  );
}

export default UsersListItem;
