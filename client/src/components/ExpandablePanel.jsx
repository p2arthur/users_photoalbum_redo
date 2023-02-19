import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { useState } from "react";

function ExpandablePanel({ header, children }) {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="w-full rounded border mb-3 gap-5">
      <div
        onClick={handleClick}
        className="px-3 py-3 flex justify-between items-center cursor-pointer select-none"
      >
        {header} <div>{expanded ? <GoChevronUp /> : <GoChevronDown />}</div>
      </div>
      {expanded && <div className="p-3 border-t-2">{children}</div>}
    </div>
  );
}

export default ExpandablePanel;
