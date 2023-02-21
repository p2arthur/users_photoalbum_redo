import { useFetchAlbumsQuery, useAddAlbumMutation } from "../store";
import Skeleton from "./Skeleton";
import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";
import { faker } from "@faker-js/faker";

function AlbumsList({ user }) {
  console.log(user);
  const { data, error, isLoading } = useFetchAlbumsQuery(user.id);

  const [addAlbum, results] = useAddAlbumMutation();

  const handleAddAlbum = () => {
    console.log("addAlbum");
    console.log(user.id);
    const album = { title: faker.commerce.productName(), userId: user.id };
    addAlbum(album);
  };

  let content;

  if (isLoading) {
    content = <Skeleton times={3} className="w-full h-10" />;
  } else if (error) {
    content = <div>Error fetching albums</div>;
  } else {
    content = data.map((album) => {
      const header = album.title;
      return (
        <ExpandablePanel key={album.id} header={header}>
          Photo
        </ExpandablePanel>
      );
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        Albums by: {user.username}{" "}
        <Button onClick={handleAddAlbum}>Add new album +</Button>
      </div>
      <div>{content}</div>
    </div>
  );
}

export default AlbumsList;
