const Skeleton = ({ width, height, borderRadius }) => (
  <div
    className="skeleton"
    style={{
      width: width || "100%",
      height: height || "1em",
      borderRadius: borderRadius || "4px",
    }}
  ></div>
);

export default Skeleton;
