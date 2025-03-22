import Image from "next/image";
import Link from "next/link";

export default function Sidebar ({ isSideBarVisible, userData, handleGithubLogOut }) {

    return (
        // Sidebar
        <div className={`sm:hidden fixed top-12 p-1 overflow-hidden flex flex-col gap-1 bg-gray-300 h-auto pb-1.5  w-auto z-30 rounded-lg transition-transform duration-500 ${isSideBarVisible ? "translate-x-0 right-2" : "right-0 translate-x-full"}`} >
            <div className="bg-violet-800  flex  items-center p-1.5 gap-1 rounded-lg h-1/4">
                <Image
                    aria-hidden
                    src={userData.image}
                    alt={`${userData.name}'s profile picture`}
                    height={500}
                    width={500}
                    className="h-14 w-14 bg-yellow-300 rounded-full border-blue-300 border-2"
                />
                <div className=" flex items-start justify-center flex-col">
                    <h3 className="text-white text-sm font-bold">{`~${userData.name}`}</h3>
                    <h3 className="text-white text-xs font-thin pl-2">{userData.email}</h3>
                </div>
            </div>

            <div className="bg-black rounded-lg p-1.5">
                <ul
                    aria-labelledby="SideBarnavigation"
                    className="text-white h-full flex flex-col gap-2 justify-center"
                >
                    <li
                        className="bg-gray-700 rounded-md text-lg font-semibold flex items-center p-0.5"
                    >
                        <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 21H5C4.44772 21 4 20.5523 4 20V11L1 11L11.3273 1.6115C11.7087 1.26475 12.2913 1.26475 12.6727 1.6115L23 11L20 11V20C20 20.5523 19.5523 21 19 21ZM13 19H18V9.15745L12 3.7029L6 9.15745V19H11V13H13V19Z"></path>
                        </svg>

                        <Link
                            href="/"
                            className="w-full p-1"
                        >
                            Home
                        </Link>
                    </li>
                    <li
                        className="bg-gray-700 rounded-md text-lg font-semibold flex items-center p-0.5"
                    >
                        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 17H13M9 13H13M9 9H10M17 18V21M17 15H17.01M13 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H13M13 3L19 9M13 3V7.4C13 7.96005 13 8.24008 13.109 8.45399C13.2049 8.64215 13.3578 8.79513 13.546 8.89101C13.7599 9 14.0399 9 14.6 9H19M19 9V11.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                        <Link
                            href="/about"
                            className="w-full p-1"
                        >
                            About
                        </Link>
                    </li>
                    <li
                        className="bg-gray-700 rounded-md text-lg font-semibold flex items-center p-0.5"
                    >
                        <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M14 21C13.4477 21 13 20.5523 13 20V12C13 11.4477 13.4477 11 14 11H20C20.5523 11 21 11.4477 21 12V20C21 20.5523 20.5523 21 20 21H14ZM4 13C3.44772 13 3 12.5523 3 12V4C3 3.44772 3.44772 3 4 3H10C10.5523 3 11 3.44772 11 4V12C11 12.5523 10.5523 13 10 13H4ZM9 11V5H5V11H9ZM4 21C3.44772 21 3 20.5523 3 20V16C3 15.4477 3.44772 15 4 15H10C10.5523 15 11 15.4477 11 16V20C11 20.5523 10.5523 21 10 21H4ZM5 19H9V17H5V19ZM15 19H19V13H15V19ZM13 4C13 3.44772 13.4477 3 14 3H20C20.5523 3 21 3.44772 21 4V8C21 8.55228 20.5523 9 20 9H14C13.4477 9 13 8.55228 13 8V4ZM15 5V7H19V5H15Z"></path>
                        </svg>
                        <Link
                            href="/dashboard"
                            className="w-full p-1"
                        >
                            Dashboard
                        </Link>
                    </li>
                    <li
                        className="bg-gray-700 rounded-md text-lg font-semibold flex items-center p-0.5"
                    >
                        <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 22H18V20C18 18.3431 16.6569 17 15 17H9C7.34315 17 6 18.3431 6 20V22H4V20C4 17.2386 6.23858 15 9 15H15C17.7614 15 20 17.2386 20 20V22ZM12 13C8.68629 13 6 10.3137 6 7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7C18 10.3137 15.3137 13 12 13ZM12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"></path>
                        </svg>
                        <Link
                            href={`/${userData.userName}`}
                            className="w-full p-1"
                        >
                            Admin
                        </Link>
                    </li>
                    <li
                        className="bg-gray-700 rounded-md text-lg font-semibold flex items-center p-0.5"
                    >
                        <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 2C3.44772 2 3 2.44772 3 3V5H5V4H19V20H5V19H3V21C3 21.5523 3.44772 22 4 22H20C20.5523 22 21 21.5523 21 21V3C21 2.44772 20.5523 2 20 2H4ZM9 16C9 14.3431 10.3431 13 12 13C13.6569 13 15 14.3431 15 16H9ZM12 12C10.8954 12 10 11.1046 10 10C10 8.89543 10.8954 8 12 8C13.1046 8 14 8.89543 14 10C14 11.1046 13.1046 12 12 12ZM6 9V7H2V9H6ZM6 11V13H2V11H6ZM6 17V15H2V17H6Z"></path>
                        </svg>
                        <Link
                            href="/contact"
                            className="w-full p-1"
                        >
                            Contact
                        </Link>
                    </li>
                </ul>
            </div>

            <div className="flex justify-center p-1">
                <button onClick={handleGithubLogOut} style={{ backgroundColor: '#FD0000' }} className='w-full text-white py-2 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-1 '>
                    <svg width={18} height={18} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffffff"><path d="M4 18H6V20H18V4H6V6H4V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V18ZM6 11H13V13H6V16L1 12L6 8V11Z"></path>
                    </svg>
                    Sign out
                </button>
            </div>

        </div>
    );
}
