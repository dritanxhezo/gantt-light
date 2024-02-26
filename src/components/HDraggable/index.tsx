import React from "react";

import "./draggable.css";

const HDraggable = (props: any) => {
  var isDragging = false;
  var initialX;
  var draggableElement;

  const onDragStartHandler = (e) => {
    // Save the initial mouse position when dragging starts
    isDragging = true;
    draggableElement = e.target;
    initialX = e.clientX;
  };

  const onDragOverHandler = (e) => {
    console.log(isDragging);
    console.log(draggableElement.firstChild.nodeValue);
    console.log(initialX);
    console.log("e", e);
    // Calculate the distance moved and update the element's position
    if (isDragging) {
      var deltaX = e.clientX - initialX;
      draggableElement.style.left = draggableElement.offsetLeft + deltaX + "px";
      initialX = e.clientX;
    }
    console.log("->", draggableElement.style.left);
  };

  const onDragEndHandler = () => {
    // Reset the dragging state when dragging ends
    isDragging = false;
  };

  return (
    <>
      <div
        className="drag-container"
        onDragOver={onDragOverHandler}
        onDragEnd={onDragEndHandler}
      >
        <div
          draggable="true"
          className="draggable"
          onDragStart={onDragStartHandler}
          style={{ width: 20 + "px", left: 10 + "px" }}
        >
          drag1
        </div>
        <div
          draggable="true"
          className="draggable"
          onDragStart={onDragStartHandler}
        >
          drag2
        </div>
      </div>
    </>
  );
};

export default HDraggable;
