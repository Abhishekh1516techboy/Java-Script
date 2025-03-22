"use client";

import { usePathname } from "next/navigation";

export default function Home () {

  const pathname = usePathname();

  return (
    <div>
      this is nextJS Next-Navigation
      <p>I am Inside {pathname}</p>
    </div>
  );
}
