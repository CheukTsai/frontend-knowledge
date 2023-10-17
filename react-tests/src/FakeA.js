import React from "react";

const FakeA = ({ href, target, children }) => {
  const handleClick = (event) => {
    // Prevent the default behavior of the anchor tag
    event.preventDefault();

    // Use window.location or React Router to navigate to the specified URL
    if (target === "_blank") {
      window.open(href);
    } else {
      window.location.href = href;
    }
  };

  return (
    <div
      style={{ textDecoration: "underline", cursor: "pointer" }}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

export default FakeA;
