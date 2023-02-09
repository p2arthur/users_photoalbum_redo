import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store";
import Skeleton from "./Skeleton";

export function UsersList() {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  if (isLoading) {
    return <Skeleton times={6} className="w-full h-10" />;
  }
  if (error) {
    return <div>Error fetching users...</div>;
  }

  return <div>{data.length} users fetched</div>;
}
