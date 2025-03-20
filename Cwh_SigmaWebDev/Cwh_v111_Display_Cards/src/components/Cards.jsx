import { useEffect, useState } from "react";

const Cards = () => {
  const [users, setUsers] = useState([]); // State to store user data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json(); // Convert to JSON
        setUsers(data); // Update the state with fetched data
      } catch (error) {
        console.log("Fetch error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container bg-yellow-500 h-screen p-5 flex flex-wrap justify-center gap-5">
      {users.map((user) => (
        <div key={user.id} className="bg-black h-80 w-60 rounded-2xl p-5">
          <h2 className="font-bold text-white text-center py-2">{user.name}</h2>
          <h3 className="text-center font-thin">{user.email}</h3>
          <h3 className="text-center font-bold py-5">{user.address.city}</h3>
          <p className="text-center py-14">{user.website}</p>
          <h4 className="text-center">{user.phone}</h4>
        </div>
      ))}
    </div>
  );
};

export default Cards;
