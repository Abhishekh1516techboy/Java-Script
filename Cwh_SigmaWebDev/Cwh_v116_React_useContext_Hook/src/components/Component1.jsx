import { useContext } from "react";
import { counterContext } from "../context/context";

const Component1 = () => {
  const value = useContext(counterContext);

  return (
    <div>
      <h1>This is Component1 {value.count} </h1>
    </div>
  );
};

export default Component1;
