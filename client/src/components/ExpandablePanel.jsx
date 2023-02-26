import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { useState } from "react";

function ExpandablePanel({ header, children }) {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="w-full rounded mb-2 gap-5 bg-slate-600 text-white">
      <div
        onClick={handleClick}
        className="px-3 py-3 flex justify-between items-center cursor-pointer select-none bg-slate-800 text-white rounded"
      >
        {header} <div>{expanded ? <GoChevronUp /> : <GoChevronDown />}</div>
      </div>
      {expanded && <div className="p-3 ">{children}</div>}
    </div>
  );
}

export default ExpandablePanel;
