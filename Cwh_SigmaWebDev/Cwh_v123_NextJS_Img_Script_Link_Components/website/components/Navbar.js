import Link from "next/link";

export default function Navbar () {
  return (
    <div>
      <header className='h-14 bg-black'>
        <div className='container mx-auto flex items-center justify-between h-full  md:px-24'>
          <Link href='/'
            aria-label='Home'
            prefetch={true}
          >
            <h1 className='text-3xl font-extrabold text-white cursor-pointer'>
              NextJS
            </h1>
          </Link>
          <nav>
            <ul className='flex items-center gap-6 md:gap-12'>
              <li>
                <Link
                  href='/'
                  className='font-bold text-white hover:text-yellow-400'
                  aria-label='Home'
                  prefetch={true}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href='/about'
                  className='font-bold text-white hover:text-yellow-400'
                  aria-label='About'
                  prefetch={true}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href='/contact'
                  className='font-bold text-white hover:text-yellow-400'
                  aria-label='Contact'
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
}
