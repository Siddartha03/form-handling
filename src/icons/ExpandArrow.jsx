const ExpandArrow = ({ fill = "#00224b", height = "24", width = "24", handleExpandArrowClick }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
      height={height}
      width={width}
      style={{ zIndex: "2", cursor: "pointer" }}
      onClick={handleExpandArrowClick}
    >
      <path d="m12 15.375-6-6 1.4-1.4 4.6 4.6 4.6-4.6 1.4 1.4Z" />
    </svg>
  );
};

export default ExpandArrow;
