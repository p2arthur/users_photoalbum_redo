import { useFetchAlbumsQuery } from "../store";

function AlbumsList({ user }) {
  console.log(user);
  const { data, error, isLoading } = useFetchAlbumsQuery(user.id);

  console.log(data, error, isLoading);

  return <div>Albums by: {user.username}</div>;
}

export default AlbumsList;
