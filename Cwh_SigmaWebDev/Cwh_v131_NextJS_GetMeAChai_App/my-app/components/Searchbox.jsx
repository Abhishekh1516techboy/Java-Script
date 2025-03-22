"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";

export default function Searchbox ({ isSearchBoxVisible, setIsSearchboxVisible }) {

    const router = useRouter();

    const [searchTerm, setSearchTerm] = useState("");
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    // Prevent background scrolling when SearchBox is open
    useEffect(() => {
        document.body.style.overflow = isSearchBoxVisible ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isSearchBoxVisible]);

    // Debounce function
    const debounce = (func, delay) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => func(...args), delay);
        };
    };

    // Function to fetch users from API
    const fetchUsers = useCallback(async (query) => {
        if (!query.trim()) {
            setUsers([]);
            return;
        }

        try {
            setError(null);
            const response = await fetch(`/api/usersSearch?search=${encodeURIComponent(query)}`);

            if (!response.ok) {
                throw new Error(`API request failed with status: ${response.status}`);
            }

            const data = await response.json();
            setUsers(data.users || []);
        } catch (error) {
            console.error("Error fetching users:", error);
            setError(error.message || "An error occurred while fetching users");
        }
    }, []);

    // Debounced search function
    const debouncedSearch = useCallback(debounce(fetchUsers, 300), [fetchUsers]);

    // Call API when search term changes
    useEffect(() => {
        debouncedSearch(searchTerm);
    }, [searchTerm, debouncedSearch]);

    return (
        <div className="flex flex-col justify-start items-center w-full h-screen fixed top-12 left-0 z-50">
            {/* Background Overlay */}
            <div
                className={`h-screen w-screen fixed top-0 left-0 cursor-pointer transition-all duration-300 ${isSearchBoxVisible ? "bg-opacity-40 backdrop-blur-md bg-gray-950" : "bg-transparent"
                    }`}
                onClick={() => setIsSearchboxVisible(false)}
            ></div>

            {/* Search Bar */}
            <div className="text-white lg:w-2/5 w-11/12 z-10 overflow-hidden h-[18vh]">
                <div className="flex flex-col justify-around items-center h-full">
                    <h1 className="sm:text-4xl text-2xl sm:font-bold font-semibold">
                        Find creators you love
                    </h1>
                    <div className="relative lg:w-full w-full">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                        >
                            <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path>
                        </svg>
                        <input
                            type="search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search"
                            className="p-2 pl-10 w-full rounded-full outline-none text-gray-500 font-semibold tracking-wide"
                            autoFocus
                        />
                    </div>
                </div>
            </div>

            {/* Search Results */}
            <div className={`bg-gray-300 overflow-y-scroll scrollbar-hide lg:w-2/5 w-11/12 max-h-[70vh] scroll-smooth text-center flex flex-col gap-1 z-10 rounded-xl ${searchTerm ? "p-1" : ""}`}>
                {error ? (
                    <div className="bg-red-900 text-white rounded-md h-[110px] flex items-center justify-center">
                        {error}
                    </div>
                ) : users.length > 0 ? (
                    users.map((user) => (

                        <div
                            onClick={() => {
                                setIsSearchboxVisible(false);
                                
                                setTimeout(() => {
                                    router.push(user.userName);
                                }, 1000)
                            }}
                            key={user._id}
                            className="bg-gray-950 rounded-md p-2  flex items-center gap-3 hover:bg-violet-950 transition-all cursor-pointer"
                        >
                            <Image
                                src={user.profilePic || "/admin.png"} // Default avatar if no profile pic
                                alt={user.userName}
                                width={50}
                                height={50}
                                className="size-10 sm:size-16 rounded-full object-cover object-center bg-yellow-400"
                            />
                            <div className="text-left flex flex-col text-white w-full">
                                <p className="font-bold text-sm sm:text-lg text-gray-200">{user.userName}</p>
                                <p className="text-gray-300 text-xs sm:text-sm">{user.email}</p>
                                <p className="text-gray-300 text-xs  w-full text-end">
                                    <small>
                                        {new Date(user.createdAt).toLocaleDateString("en-US", {
                                            year: "numeric", // 2025
                                            month: "long", // February
                                            day: "numeric", // 27
                                        })}
                                    </small>
                                </p>
                            </div>
                        </div>

                    ))
                ) : searchTerm ? (
                    <div className="bg-gray-950 text-white rounded-md h-[110px] flex items-center justify-center">
                        No users found
                    </div>
                ) : ""}
            </div>
        </div>
    );
}
