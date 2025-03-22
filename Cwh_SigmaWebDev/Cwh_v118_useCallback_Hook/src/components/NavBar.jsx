import { memo } from "react";

const NavBar = ({ adjective, getAdjective }) => {
  console.log("navBar is rendered");

  return (
    <div>
      <h1>I am an {adjective} NavBar</h1>
      <button
        onClick={() => {
          getAdjective();
        }}
      >
        {getAdjective()}
      </button>
    </div>
  );
};

export default memo(NavBar);
