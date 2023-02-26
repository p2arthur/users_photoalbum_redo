import { useFetchPhotosQuery } from "../store";
import Button from "./Button";
import PhotosListItem from "./PhotosListItem";
import Skeleton from "./Skeleton";
import { usePostPhotoMutation } from "../store";
import { faker } from "@faker-js/faker";

function PhotosList({ album }) {
  const { data, error, isFetching } = useFetchPhotosQuery(album.id);

  const [postPhoto, isPostingPhoto, postingPhotoError] = usePostPhotoMutation();

  const handlePostPhoto = () => {
    console.log(album);
    postPhoto({
      photoUrl: faker.image.abstract(255, 255, true),
      albumId: album.id,
      title: faker.commerce.product(),
    });
  };

  let content;

  if (isFetching) {
    content = <Skeleton times={4} className="w-full h-48" />;
  } else if (error) {
    content = <div>Error</div>;
  } else {
    content = data.map((photo) => (
      <PhotosListItem key={photo.id} photo={photo}>
        aaaaaa
      </PhotosListItem>
    ));
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">Photos at album: {album.title}</h3>
        <Button
          loadingMessage="Adding photo"
          loading={isPostingPhoto.isLoading}
          onClick={handlePostPhoto}
          className="bg-green-500 text-white border-none hover:bg-green-600 transition-all rounded"
        >
          Add new photo +
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-10 mt-10">{content}</div>
    </div>
  );
}

export default PhotosList;
