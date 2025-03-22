'use client'

export default function Home () {

  const handleClick = async () => {

    let data = {
      name: "Roushan",
      role: "Programming",
    }

    try {
      let res = await fetch("/api/add", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      let result = await res.json();
      console.log(result);
    } catch (error) {
      console.error("Error fetching API:", error);
    }
  };

  return (
    <div>
      <h1 className="container bg-violet-600 font-bold text-center text-2xl">This is NextJS APIs route demo</h1>
      <button onClick={handleClick} className="bg-red-600 p-2 rounded-lg mx-4 my-4">Click Me</button>
    </div>
  );
}

