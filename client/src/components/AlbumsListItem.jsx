import ExpandablePanel from "./ExpandablePanel";
import Button from "./Button";
import { IoTrashOutline } from "react-icons/io5";
import { useRemoveAlbumMutation } from "../store";

function AlbumsListItem({ album }) {
  const [removeAlbum, results] = useRemoveAlbumMutation();

  const handleAlbumDelete = () => {
    removeAlbum(album);
  };

  const header = (
    <div className="flex gap-3">
      <Button loading={results.isLoading} onClick={handleAlbumDelete}>
        <IoTrashOutline />
      </Button>
      {album.title}
    </div>
  );
  return (
    <ExpandablePanel key={album.id} header={header}>
      Photo
    </ExpandablePanel>
  );
}

export default AlbumsListItem;
