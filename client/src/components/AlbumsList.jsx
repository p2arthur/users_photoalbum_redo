import { useFetchAlbumsQuery, useAddAlbumMutation } from "../store";
import Skeleton from "./Skeleton";
import Button from "./Button";
import AlbumsListItem from "./AlbumsListItem";
import { faker } from "@faker-js/faker";

function AlbumsList({ user }) {
  const { data, error, isFetching } = useFetchAlbumsQuery(user.id);
  const [addAlbum, results] = useAddAlbumMutation();
  console.log(results);

  const handleAddAlbum = () => {
    addAlbum({ title: faker.commerce.productName(), userId: user.id });
  };

  let content;

  if (isFetching) {
    content = <Skeleton times={3} className="w-full h-10" />;
  } else if (error) {
    content = <div>Error fetching albums</div>;
  } else {
    content = data.map((album) => {
      return <AlbumsListItem album={album} key={album.id} />;
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        Albums by: {user.username}{" "}
        <Button
          loading={results.isLoading}
          loadingMessage="Adding album"
          onClick={handleAddAlbum}
        >
          Add new album +
        </Button>
      </div>
      <div>{content}</div>
    </div>
  );
}

export default AlbumsList;
