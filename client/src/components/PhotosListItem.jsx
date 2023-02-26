import ExpandablePanel from "./ExpandablePanel";
import { usePostPhotoMutation } from "../store";

function PhotosListItem({ photo }) {
  const header = (
    <div className="p-3 text-center bg-slate-900">{photo.title}</div>
  );

  return (
    <div className="border-2 border-slate-900 w-56 rounded p-1">
      <div>
        <img className="w-full" src={photo.url} alt="" />
      </div>
      {header}
    </div>
  );
}

export default PhotosListItem;
