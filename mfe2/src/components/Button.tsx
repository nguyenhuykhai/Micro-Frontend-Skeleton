import React from "react";

const Button: React.FC = () => {
  return (
    <div>
      <h2>Remote Button Component</h2>
      <button
        style={{ padding: "10px 20px", fontSize: "16px" }}
        onClick={() => console.log("clicked")}
      >
        Click me from Remote!
      </button>
    </div>
  );
};

export default Button;
