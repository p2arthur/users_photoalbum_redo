import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, addUser } from "../store";
import Skeleton from "./Skeleton";
import Button from "./Button";

export function UsersList() {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const handleUserAdd = () => {
    dispatch(addUser());
  };

  const renderedUsers = data.map((user) => (
    <div className="w-full rounded border mb-3 p-3" key={user.id}>
      {user.name}
    </div>
  ));

  if (isLoading) {
    return <Skeleton times={6} className="w-full h-10" />;
  }
  if (error) {
    return <div>Error fetching users...</div>;
  }

  return (
    <div>
      <div className="flex flex-row justify-between m-3">
        <h2 className="m2 text-xl">Users</h2>
        <Button onClick={handleUserAdd}>+ Add new user</Button>
      </div>
      {renderedUsers}
    </div>
  );
}
