import { useSelector } from "react-redux";

const NavBar = () => {
  const count = useSelector((state) => state.counter.value);

  return (
    <div>
      <h1>This is NavBar {count}</h1>
    </div>
  );
};

export default NavBar;
