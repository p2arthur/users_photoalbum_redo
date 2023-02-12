import classNames from "classnames";

function Skeleton({ className, times }) {
  const outterClass = classNames(
    "relative",
    "overflow-hidden",
    "rounded",
    "bg-gray-200",
    "mb-2.5",
    className
  );

  const innerClass = classNames(
    "animate-shimmer",
    "absolute",
    "inset-0",
    "-translate-x-full",
    "bg-gradient-to-r",
    "from-gray-200",
    "via-white",
    "to-gray-200"
  );

  const renderedBoxes = Array(times)
    .fill(0)
    .map((_, i) => (
      <div key={i} className={outterClass}>
        <div className={innerClass}></div>
      </div>
    ));

  return renderedBoxes;
}

export default Skeleton;
