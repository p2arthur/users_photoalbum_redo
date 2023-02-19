import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchUsers, addUser } from "../store";
import Skeleton from "./Skeleton";
import Button from "./Button";
import { useThunk } from "../hooks/useThunk";
import UsersListItem from "./UsersListItem";

export function UsersList() {
  const { data } = useSelector((state) => state.users);
  const [doFetchUsers, isLoadingUser, isLoadingUserError] =
    useThunk(fetchUsers);
  const [doCreateUser, isCreatingUser, isCreatingUserError] = useThunk(addUser);

  useEffect(() => {
    try {
      doFetchUsers();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }, [doFetchUsers]);

  const handleUserAdd = async () => {
    try {
      doCreateUser();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const renderedUsers = data.map((user) => (
    <UsersListItem user={user} key={user.id} />
  ));

  if (isCreatingUser) {
    console.log("creatinh user");
  }
  if (isLoadingUserError) {
    return <div>Error fetching users...</div>;
  }

  return (
    <div>
      <div className="flex flex-row justify-between m-3">
        <h2 className="m2 text-xl">Users</h2>
        <Button
          className="w-15 h-10"
          loading={isCreatingUser}
          onClick={handleUserAdd}
        >
          + Add new user
        </Button>
      </div>
      {isLoadingUser ? (
        <Skeleton times={10} className="w-full h-10" />
      ) : data.length > 0 ? (
        renderedUsers
      ) : (
        "0 Users"
      )}
      {}
    </div>
  );
}
