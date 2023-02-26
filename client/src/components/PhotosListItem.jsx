import { IoTrashOutline } from "react-icons/io5";
import Button from "./Button";
import { useRemovePhotoMutation } from "../store";

function PhotosListItem({ photo }) {
  const [deletePhoto, isDeletingPhoto, deletePhotoError] =
    useRemovePhotoMutation();

  const header = (
    <div className="p-3 text-center bg-slate-900">{photo.title}</div>
  );

  const handlePhotoDelete = () => {
    deletePhoto(photo);
  };

  return (
    <div className="border-2 border-slate-900 rounded p-1 relative hover:scale-105 transition-all">
      <Button
        onClick={handlePhotoDelete}
        className="bg-red-500 rounded-full w-10 h-10 flex items-center justify-center absolute -top-5 -right-5 hover:bg-red-600 cursor-pointer transition-all hover:shadow-md hover:scale-110 border-none"
      >
        <IoTrashOutline />
      </Button>
      <div>
        <img className="w-full" src={photo.url} alt="" />
      </div>
      {header}
    </div>
  );
}

export default PhotosListItem;
