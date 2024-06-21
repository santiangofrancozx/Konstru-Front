import React from "react";

const HandleWrapper = {
  height: "1rem",
  verticalAlign: "bottom",
  display: "inline-block",
  marginRight: "0.5rem",
  cursor: ({ isDragging }) => (isDragging ? "grabbing" : "grab"),
};

export const DragHandle = ({ isDragging, ...props }) => {
  return (
    <div style={{ ...HandleWrapper, cursor: isDragging ? "grabbing" : "grab" }} {...props}>
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="grip-vertical"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 512"
        style={{ width: "100%", height: "100%" }}
      >
        <path
          fill="currentColor"
          d="M96 32H32C14.33 32 0 46.33 0 64v64c0 17.67 14.33 32 32 32h64c17.67 0 32-14.33 32-32V64c0-17.67-14.33-32-32-32zm0 160H32c-17.67 0-32 14.33-32 32v64c0 17.67 14.33 32 32 32h64c17.67 0 32-14.33 32-32v-64c0-17.67-14.33-32-32-32zm0 160H32c-17.67 0-32 14.33-32 32v64c0 17.67 14.33 32 32 32h64c17.67 0 32-14.33 32-32v-64c0-17.67-14.33-32-32-32zM288 32h-64c-17.67 0-32 14.33-32 32v64c0 17.67 14.33 32 32 32h64c17.67 0 32-14.33 32-32V64c0-17.67-14.33-32-32-32zm0 160h-64c-17.67 0-32 14.33-32 32v64c0 17.67 14.33 32 32 32h64c17.67 0 32-14.33 32-32v-64c0-17.67-14.33-32-32-32zm0 160h-64c-17.67 0-32 14.33-32 32v64c0 17.67 14.33 32 32 32h64c17.67 0 32-14.33 32-32v-64c0-17.67-14.33-32-32-32z"
        ></path>
      </svg>
    </div>
  );
};
