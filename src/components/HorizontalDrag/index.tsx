import React, { useState } from "react";

const HorizontalDrag = () => {
  const [isDragging, setDragging] = useState(false);
  const [initialX, setInitialX] = useState(0);

  const handleDragStart = (e) => {
    setDragging(true);
    setInitialX(e.clientX);
  };

  //   const handleDragOver = (e) => {
  //     if (isDragging) {
  //       const deltaX = e.clientX - initialX;
  //       setInitialX(e.clientX);

  //       const draggableElement = e.target;
  //       const newLeft = draggableElement.offsetLeft + deltaX;

  //       // Adjust these values based on your bounding box dimensions
  //       const minX = 0;
  //       const maxX = window.innerWidth - draggableElement.offsetWidth;

  //       // Check boundaries and update position
  //       if (newLeft >= minX && newLeft <= maxX) {
  //         draggableElement.style.left = newLeft + "px";
  //       }
  //     }
  //   };

  const handleDragOver = (e) => {
    console.log(e.target.parentElement.clientWidth);
    if (isDragging) {
      const deltaX = e.clientX - initialX;
      setInitialX(e.clientX);

      const draggableElement = e.target;
      const elementWidth = draggableElement.offsetWidth;

      //   const minX = elementWidth / 2;
      //   const maxX = e.target.parentElement.clientWidth - elementWidth / 2;
      const minX = 0;
      const maxX = e.target.parentElement.clientWidth - elementWidth;
      let newLeft = draggableElement.offsetLeft + deltaX;

      // Ensure the center stays within the bounding box
      if (newLeft < minX) {
        newLeft = minX;
      } else if (newLeft > maxX) {
        newLeft = maxX;
      }

      draggableElement.style.left = newLeft + "px";
    }
  };

  const handleDragEnd = () => {
    setDragging(false);
  };

  return (
    <div
      style={{
        width: "500px",
        height: "70px",
        backgroundColor: "yellow",
        position: "absolute",
        cursor: "grab",
      }}
    >
      <div
        id={"draggable" + "1"}
        style={{
          width: "100px",
          height: "50px",
          backgroundColor: "#3498db",
          color: "#fff",
          textAlign: "center",
          lineHeight: "50px",
          position: "absolute",
          cursor: "grab",
          left: 0,
          //   left: '50%', // Initial position centered
          //   transform: "translateX(-50%)", // Center the element
        }}
        draggable="true"
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        Drag me horizontally
      </div>
    </div>
  );
};

export default HorizontalDrag;
