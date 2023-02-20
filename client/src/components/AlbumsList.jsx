import { useFetchAlbumsQuery } from "../store";
import Skeleton from "./Skeleton";
import expandablePanel from "./ExpandablePanel";
import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";

function AlbumsList({ user }) {
  console.log(user);
  const { data, error, isLoading } = useFetchAlbumsQuery(user.id);

  let content;

  if (isLoading) {
    content = <Skeleton times={3} className="w-full h-10" />;
  } else if (error) {
    content = <div>Error fetching albums</div>;
  } else {
    content = data.map((album) => {
      const header = album.title;
      return <ExpandablePanel header={header}>Photo</ExpandablePanel>;
    });
  }

  return (
    <div>
      <div>Albums by: {user.username}</div>
      <div>{content}</div>
    </div>
  );
}

export default AlbumsList;
