"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import UserAccount from "@/components/UserAccount";
import Sidebar from "@/components/Sidebar";
import Searchbox from "@/components/Searchbox";

export default function Navlinks () {

    const [isUserBoxVisible, setIsUserBoxVisible] = useState(false); // State for userAccount Box visibility
    const [isDropdownVisible, setIsDropdownVisible] = useState(false); // State for dropdown visibility
    const [isSideBarVisible, setIsSidebarVisible] = useState(false); // State for Sidebar Visibility
    const [isSearchBoxVisible, setIsSearchboxVisible] = useState(false); // State for Searchbox Visibility


    const { data: session } = useSession({ required: false });


    const handleGithubLogOut = () => {
        signOut(); // GithHub Login
    };

    return (
        <>
            <ul className=" flex justify-end items-center p-1 sm:space-x-4 font-bold sm:px-4 w-full text-white">

                {/* SearchBar */}
                <svg onClick={() => setIsSearchboxVisible(!isSearchBoxVisible)} className="w-6 h-6 mr-1 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path></svg>

                {/* Dropdown button with hover functionality */}
                {session && <div
                    className="relative hidden sm:block"
                    onMouseEnter={() => setIsDropdownVisible(true)} // Show dropdown on hover
                    onMouseLeave={() => setIsDropdownVisible(false)} // Hide dropdown when not hovered
                >
                    <button
                        className="text-white dark:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-4 py-1 text-center inline-flex items-center p-1"
                        type="button"
                    >
                        {session?.user.name}
                        <svg
                            className="w-2.5 h-2.5 ms-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 4 4 4-4"
                            />
                        </svg>
                    </button>

                    {/* Dropdown menu */}
                    {isDropdownVisible && (
                        <div className="absolute z-10 mt-0.5 bg-white divide-y divide-gray-100 rounded-lg shadow w-36 dark:bg-gray-700">
                            <ul
                                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                aria-labelledby="dropdownDelayButton"
                            >
                                <li className="flex items-center p-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 21H5C4.44772 21 4 20.5523 4 20V11L1 11L11.3273 1.6115C11.7087 1.26475 12.2913 1.26475 12.6727 1.6115L23 11L20 11V20C20 20.5523 19.5523 21 19 21ZM13 19H18V9.15745L12 3.7029L6 9.15745V19H11V13H13V19Z"></path>
                                    </svg>
                                    <Link
                                        href="/"
                                        className="w-full px-2 py-1"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li className="flex items-center p-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 17H13M9 13H13M9 9H10M17 18V21M17 15H17.01M13 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H13M13 3L19 9M13 3V7.4C13 7.96005 13 8.24008 13.109 8.45399C13.2049 8.64215 13.3578 8.79513 13.546 8.89101C13.7599 9 14.0399 9 14.6 9H19M19 9V11.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                                    <Link
                                        href="/about"
                                        className="w-full px-2 py-1"
                                    >
                                        About
                                    </Link>
                                </li>
                                <li className="flex items-center p-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M14 21C13.4477 21 13 20.5523 13 20V12C13 11.4477 13.4477 11 14 11H20C20.5523 11 21 11.4477 21 12V20C21 20.5523 20.5523 21 20 21H14ZM4 13C3.44772 13 3 12.5523 3 12V4C3 3.44772 3.44772 3 4 3H10C10.5523 3 11 3.44772 11 4V12C11 12.5523 10.5523 13 10 13H4ZM9 11V5H5V11H9ZM4 21C3.44772 21 3 20.5523 3 20V16C3 15.4477 3.44772 15 4 15H10C10.5523 15 11 15.4477 11 16V20C11 20.5523 10.5523 21 10 21H4ZM5 19H9V17H5V19ZM15 19H19V13H15V19ZM13 4C13 3.44772 13.4477 3 14 3H20C20.5523 3 21 3.44772 21 4V8C21 8.55228 20.5523 9 20 9H14C13.4477 9 13 8.55228 13 8V4ZM15 5V7H19V5H15Z"></path>
                                    </svg>
                                    <Link
                                        href="/dashboard"
                                        className="w-full px-2 py-1"
                                    >
                                        Dashboard
                                    </Link>
                                </li>
                                <li className="flex items-center p-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 22H18V20C18 18.3431 16.6569 17 15 17H9C7.34315 17 6 18.3431 6 20V22H4V20C4 17.2386 6.23858 15 9 15H15C17.7614 15 20 17.2386 20 20V22ZM12 13C8.68629 13 6 10.3137 6 7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7C18 10.3137 15.3137 13 12 13ZM12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"></path>
                                    </svg>
                                    <Link
                                        href={`/${session?.user.userName}`}
                                        className="w-full px-2 py-1"
                                    >
                                        Admin
                                    </Link>
                                </li>
                                <li className="flex items-center p-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 2C3.44772 2 3 2.44772 3 3V5H5V4H19V20H5V19H3V21C3 21.5523 3.44772 22 4 22H20C20.5523 22 21 21.5523 21 21V3C21 2.44772 20.5523 2 20 2H4ZM9 16C9 14.3431 10.3431 13 12 13C13.6569 13 15 14.3431 15 16H9ZM12 12C10.8954 12 10 11.1046 10 10C10 8.89543 10.8954 8 12 8C13.1046 8 14 8.89543 14 10C14 11.1046 13.1046 12 12 12ZM6 9V7H2V9H6ZM6 11V13H2V11H6ZM6 17V15H2V17H6Z"></path>
                                    </svg>
                                    <Link
                                        href="/contact"
                                        className="w-full px-2 py-1"
                                    >
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>}

                <li className="flex flex-row-reverse items-center p-1 gap-1">

                    {/* Menu bar for small device */}
                    {session && !isSideBarVisible ? <svg onClick={() => setIsSidebarVisible(!isSideBarVisible)} className="w-6 h-6  cursor-pointer sm:hidden block" height={24} width={24} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
                        <path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path>
                    </svg> : session &&
                    <svg onClick={() => setIsSidebarVisible(!isSideBarVisible)} className="w-6 h-6  cursor-pointer sm:hidden block" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                    </svg>
                    }


                    {/* Conditional rendring For LoginBtn And OnLoginUserDP */}
                    {!session ? (
                        <Link href="/login">
                            <button className="bg-violet-700 text-white px-3 sm:px-4 py-0.5 sm:py-1  rounded-lg text-sm hover:bg-green-500 transition-all">
                                Login
                            </button>
                        </Link>
                    ) : (
                        <Image
                            aria-hidden
                            src={session.user.image}
                            alt="user profile picture"
                            height={100}
                            width={100}
                            className="h-8 w-8 bg-white rounded-full cursor-pointer hidden sm:block"
                            onClick={() => setIsUserBoxVisible(!isUserBoxVisible)} // Toggle visibility
                        />
                    )}
                </li>
            </ul>

            {/* SearchBox component */}
            {isSearchBoxVisible && <Searchbox isSearchBoxVisible={isSearchBoxVisible} setIsSearchboxVisible={setIsSearchboxVisible} />}

            {/* UserAccount Box */}
            {session && <UserAccount userData={session?.user} handleGithubLogOut={handleGithubLogOut} setIsUserBoxVisible={setIsUserBoxVisible} isUserBoxVisible={isUserBoxVisible} />}

            {/* SideBar component for small device*/}
            {session && <Sidebar isSideBarVisible={isSideBarVisible} userData={session?.user} handleGithubLogOut={handleGithubLogOut} />}
        </>
    );
}
