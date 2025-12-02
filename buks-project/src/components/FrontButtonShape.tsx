import React from "react";

interface FrontButtonShapeProps {
  onClick: () => void; // <-- explicitly type the click handler
}

const FrontButtonShape: React.FC<FrontButtonShapeProps> = ({ onClick }) => (
  <svg viewBox="0 0 830 473" width="100%" height="auto">
    <path
      d="M433.497,970.398C433.497,719.064 635.683,503.788 897.031,503.788C1158.379,503.788 1360.566,719.064 1360.566,970.398C1360.566,1000.025 1357.783,1029.485 1352.281,1058.41L441.781,1058.41C436.279,1029.485 433.497,1000.025 433.497,970.398Z"
      fill="rgb(179,56,56)"
      onClick={onClick} 
      style={{ cursor: "pointer" }}
    />
  </svg>
);

export default FrontButtonShape;
