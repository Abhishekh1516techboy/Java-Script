import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <nav className="bg-red-600 h-10 w-full">
        <ul className="h-full flex text-xl space-x-5 justify-end px-16 items-center font-bold">
          <li className=" h-full items-center flex">
            <NavLink
              className={(e) => {
                return e.isActive
                  ? " border-b-4 h-full items-center flex"
                  : "text-yellow-300";
              }}
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li className=" h-full items-center flex">
            <NavLink
              className={(e) => {
                return e.isActive
                  ? " border-b-4 h-full items-center flex"
                  : "text-yellow-300";
              }}
              to="/about"
            >
              About
            </NavLink>
          </li>
          <li className=" h-full items-center flex">
            <NavLink
              className={(e) => {
                return e.isActive
                  ? " border-b-4 h-full items-center flex"
                  : "text-yellow-300";
              }}
              to="/contact"
            >
              Contact-Us
            </NavLink>
          </li>
          <li className=" h-full items-center flex">
            <NavLink
              className={(e) => {
                return e.isActive
                  ? " border-b-4 h-full items-center flex"
                  : "text-yellow-300";
              }}
              to="/login"
            >
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
