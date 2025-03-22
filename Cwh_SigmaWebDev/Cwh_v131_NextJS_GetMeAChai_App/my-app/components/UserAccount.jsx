import Image from "next/image";

export default function UserAccount ({ userData, handleGithubLogOut, setIsUserBoxVisible, isUserBoxVisible }) {

    return (
        <div className={`select-none h-40 bg-gray-950 w-80 fixed top-20 right-0 z-30 rounded-2xl border border-violet-400 flex flex-col items-center justify-center gap-1 pt-8 transition-transform duration-500 ${isUserBoxVisible ? "translate-x-0" : "translate-x-full"}`}>
            <span className="text-gray-300 hover:text-gray-100 hover:border border-gray-400 rounded-lg outline-none fixed right-2 top-2 ">
                <svg
                    onClick={() => setIsUserBoxVisible(!isUserBoxVisible)} // Toggle visibility
                    width={25} height={25} className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
                </svg>
            </span>
            <Image
                aria-hidden
                src={userData.image}
                alt={`${userData.name}'s profile picture`}
                height={500}
                width={500}
                className="h-20 w-20 bg-yellow-300 rounded-xl fixed -top-8"
            />
            <h3 className="text-white text-xl font-semibold">{`~${userData.name}`}</h3>
            <h3 className="text-white text-sm font-thin">{userData.email}</h3>
            <button onClick={handleGithubLogOut}  style={{ backgroundColor: '#FD0000' }} className='text-white px-16 py-1 mt-1 rounded-lg text-sm hover:bg-red-600 transition-all flex items-center gap-1'>
                <svg width={18} height={18} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffffff"><path d="M4 18H6V20H18V4H6V6H4V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V18ZM6 11H13V13H6V16L1 12L6 8V11Z"></path></svg>
                Sign out
            </button>
        </div>
    );
}