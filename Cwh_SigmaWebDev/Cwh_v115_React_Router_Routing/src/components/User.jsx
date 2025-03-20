import { useParams } from "react-router-dom";

const User = () => {
  const { userName } = useParams();

  return (
    <div className="text-center text-3xl font-extrabold">
      <h1 className="text-6xl">I am user {userName}</h1>
    </div>
  );
};

export default User;
