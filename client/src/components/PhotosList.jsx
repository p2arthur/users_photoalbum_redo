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
      photoUrl: faker.image.abstract(),
      albumId: album.id,
      title: faker.commerce.product(),
    });
  };

  let content;

  if (isFetching) {
    content = <Skeleton times={4} className="w-full h-10" />;
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
      <div className="flex items-center justify-end">
        <Button onClick={handlePostPhoto} className="bg-green-500 text-white">
          Add new photo +
        </Button>
      </div>
      <div>{content}</div>
    </div>
  );
}

export default PhotosList;
