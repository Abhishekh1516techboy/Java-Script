import SignIn from "@/components/Signin";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className='bg-gray-100'>
      {/* Navbar */}
      <nav className='bg-blue-600 text-white shadow-md'>
        <div className='container mx-auto px-4 py-3 flex justify-between items-center'>
          {/* Branding */}
          <div className='text-xl font-bold'>
            <Link href='/' className='hover:text-gray-200'>
              MyApp
            </Link>
          </div>

          {/* Navigation Links and Sign-In Button */}
          <div className='flex items-center space-x-4'>
            <Link href='/' className='hover:text-gray-200'>
              Home
            </Link>
            <Link href='/about' className='hover:text-gray-200'>
              About
            </Link>
            {/* GitHub Authentication Btn */}
            <SignIn />
          </div>
        </div>
      </nav>
    </div>
  );
}
