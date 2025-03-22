'use client'

import { useState } from "react";

export default function Home () {

  const [count, setCount] = useState(0);

  return (
    <div className="h-full bg-red-600 text-center">
      <h1 className="text-2xl">This is Next Server-Components App and i am {count}</h1>
      <button className="bg-blue-700 p-3 rounded-lg" onClick={() => setCount((count) => count + 1)}>Click me</button>
    </div>
  );
}
