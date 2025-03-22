import Link from "next/link";

export default function Navbar() {
  return (
    <div className="sticky top-0 left-0 z-10">
      <ul className="bg-red-700 text-md font-semibold flex justify-end space-x-10 pr-24">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/pricing">Pricing</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
        <li>
          <Link href="/adminlogin">login</Link>
        </li>
        <li>
          <Link href="/adminlogout">logout</Link>
        </li>
      </ul>
    </div>
  );
}
