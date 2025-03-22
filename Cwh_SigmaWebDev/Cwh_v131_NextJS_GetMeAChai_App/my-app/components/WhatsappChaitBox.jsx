"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function WhatsAppSVG () {
    const [isChatBoxVisible, setIsChatBoxVisible] = useState(false);

    // WatsApp chait service
    const handleWhatsAppClick = () => {
        const phoneNumber = '916204609187'; // Replace with your WhatsApp number
        const message = 'Hello, I would like to know more about your services.'; // Pre-filled message
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank'); // Opens WhatsApp in a new tab
    };

    // Watsapp message show after a short delay
    const WatsappMsg = () => {

        const [showMessage, setShowMessage] = useState(false); // Controls message visibility
        const [chaitTime, setChatTime] = useState(""); // Holds the time

        // UseEffect to delay the visibility of the message
        useEffect(() => {
            const timer = setTimeout(() => {
                // Get the current local time
                const now = new Date();
                let hours = now.getHours();
                const minutes = String(now.getMinutes()).padStart(2, "0");

                // Convert to 12-hour format and handle AM/PM
                const ampm = hours >= 12 ? "PM" : "AM";
                hours = hours % 12 || 12; // Convert hour "0" to "12" for 12-hour format

                // Format the time string
                const localTime = `${hours}:${minutes} ${ampm}`;
                setChatTime(localTime); // Update the time dynamically

                setShowMessage(true); // Show the message after 2 seconds
            }, 1000);

            return () => clearTimeout(timer); // Cleanup the timer
        }, []);

        // Conditionally render the message
        return showMessage ? (
            <div className="bg-gray-100 h-3/5 w-3/4 rounded-xl rounded-tl-none p-2 relative">
                <h4 className="text-slate-500 font-bold text-sm w-full">Abhishekh Kumar</h4>
                <p className="w-11/12 text-xs lg:text-sm font-normal">Hey there!😃 How can I help you?</p>
                <span className="text-slate-500 font-bold text-xs lg:text-sm absolute right-3 bottom-1 lg:bottom-2">{chaitTime}</span>
            </div>
        ) : <>
            <svg id="dots" width="132px" height="20px" viewBox="0 0 132 58" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <title>dots</title>
                <desc>Created with Sketch.</desc>
                <defs></defs>
                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="dots" fill="#A3A3A3">
                        <circle id="dot1" cx="25" cy="30" r="13"></circle>
                        <circle id="dot2" cx="65" cy="30" r="13"></circle>
                        <circle id="dot3" cx="105" cy="30" r="13"></circle>
                    </g>
                </g>
            </svg>
        </>; // Return null while waiting
    };

    // ChaitBox
    const ChaitBox = () => {
        return (
            <div className="size-64 lg:size-80 rounded-2xl fixed right-4 bottom-20 overflow-hidden">
                <div className="bg-green-900 h-1/4 flex flex-row justify-between items-center p-1">
                    <div className="border h-12 w-12 lg:h-14 lg:w-14 rounded-full ml-2 overflow-hidden">
                        <Image
                            src="https://avatars.githubusercontent.com/u/149515154?v=4"
                            alt="Admin Pic"
                            width={60}
                            height={60}
                            className="object-fill object-center bg-black"
                        />
                    </div>

                    <div className="h-full w-2/3 flex flex-col items-start justify-center p-2">
                        <h2 className="lg:text-xl font-bold text-white">Abhishekh Kumar</h2>
                        <span className="text-xs text-gray-100">Typically reples instantly</span>
                    </div>
                    <div className=" w-10 cursor-pointer mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={30} height={30} fill="#ffffff"
                            onClick={() => setIsChatBoxVisible(!isChatBoxVisible)} // Toggle visibility
                        >
                            <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
                        </svg>
                    </div>
                </div>
                <div className="h-1/2 pt-4 pl-5 bg-slate-800">
                    {/* WatsAppMsg */}
                    <WatsappMsg />
                </div>
                <div className="bg-gray-100 h-1/4 flex justify-center items-center">
                    <button onClick={handleWhatsAppClick} className="bg-green-500 text-white font-medium h-2/4 w-10/12 rounded-3xl flex justify-center items-center gap-2">
                        <svg
                            fill="#000000"
                            height="24px"
                            width="24px"
                            version="1.1"
                            id="Layer_1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 308 308"
                            xmlSpace="preserve"
                        >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <g id="XMLID_468_">
                                    <path
                                        fill='#ffffff'
                                        id="XMLID_469_"
                                        d="M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156 c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687 c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887 c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153 c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.011c2.344-4.657,0.342-8.587-0.305-9.856c-0.531-1.062-10.012-23.944-11.02-26.348 c-2.424-5.801-5.627-8.502-10.078-8.502c-0.413,0,0,0-1.732,0.073c-2.109,0.089-13.594,1.601-18.672,4.802 c-5.385,3.395-14.495,14.217-14.495,33.249c0,17.129,10.87,33.302,15.537,39.453c0.116,0.155,0.329,0.47,0.638,0.922 c17.873,26.102,40.154,45.446,62.741,54.469c21.745,8.686,32.042,9.69,37.896,9.69c0.001,0,0.001,0,0.001,0 c2.46,0,4.429-0.193,6.166-0.364l1.102-0.105c7.512-0.666,24.02-9.22,27.775-19.655c2.958-8.219,3.738-17.199,1.77-20.458 C233.168,179.508,230.845,178.393,227.904,176.981z"
                                    ></path>
                                    <path
                                        fill='#ffffff'
                                        id="XMLID_470_"
                                        d="M156.734,0C73.318,0,5.454,67.354,5.454,150.143c0,26.777,7.166,52.988,20.741,75.928L0.212,302.716 c-0.484,1.429-0.124,3.009,0.933,4.085C1.908,307.58,2.943,308,4,308c0.405,0,0.813-0.061,1.211-0.188l79.92-25.396 c21.87,11.685,46.588,17.853,71.604,17.853C240.143,300.27,308,232.923,308,150.143C308,67.354,240.143,0,156.734,0z M156.734,268.994c-23.539,0-46.338-6.797-65.936-19.657c-0.659-0.433-1.424-0.655-2.194-0.655c-0.407,0-0.815,0.062-1.212,0.188 l-40.035,12.726l12.924-38.129c0.418-1.234,0.209-2.595-0.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677 c0-65.543,53.754-118.867,119.826-118.867c66.064,0,119.812,53.324,119.812,118.867 C276.546,215.678,222.799,268.994,156.734,268.994z"
                                    ></path>
                                </g>
                            </g>
                        </svg>
                        Click to Start Chait
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed bottom-4 right-4 z-30 flex items-center gap-3 group">
            {/* Conditionally render ChaitBox */}
            {isChatBoxVisible && <ChaitBox />}
            {/* WatsApp SVG */}
            <svg
                viewBox="0 0 1024 1024"
                className="cursor-pointer w-8 h-8 lg:w-12 lg:h-12"
                onClick={() => setIsChatBoxVisible(!isChatBoxVisible)} // Toggle visibility
            >
                <defs>
                    <path
                        id="htwasqicona-chat"
                        d="M1023.941 765.153c0 5.606-.171 17.766-.508 27.159-.824 22.982-2.646 52.639-5.401 66.151-4.141 20.306-10.392 39.472-18.542 55.425-9.643 18.871-21.943 35.775-36.559 50.364-14.584 14.56-31.472 26.812-50.315 36.416-16.036 8.172-35.322 14.426-55.744 18.549-13.378 2.701-42.812 4.488-65.648 5.3-9.402.336-21.564.505-27.15.505l-504.226-.081c-5.607 0-17.765-.172-27.158-.509-22.983-.824-52.639-2.646-66.152-5.4-20.306-4.142-39.473-10.392-55.425-18.542-18.872-9.644-35.775-21.944-50.364-36.56-14.56-14.584-26.812-31.471-36.415-50.314-8.174-16.037-14.428-35.323-18.551-55.744-2.7-13.378-4.487-42.812-5.3-65.649-.334-9.401-.503-21.563-.503-27.148l.08-504.228c0-5.607.171-17.766.508-27.159.825-22.983 2.646-52.639 5.401-66.151 4.141-20.306 10.391-39.473 18.542-55.426C34.154 93.24 46.455 76.336 61.07 61.747c14.584-14.559 31.472-26.812 50.315-36.416 16.037-8.172 35.324-14.426 55.745-18.549 13.377-2.701 42.812-4.488 65.648-5.3 9.402-.335 21.565-.504 27.149-.504l504.227.081c5.608 0 17.766.171 27.159.508 22.983.825 52.638 2.646 66.152 5.401 20.305 4.141 39.472 10.391 55.425 18.542 18.871 9.643 35.774 21.944 50.363 36.559 14.559 14.584 26.812 31.471 36.415 50.315 8.174 16.037 14.428 35.323 18.551 55.744 2.7 13.378 4.486 42.812 5.3 65.649.335 9.402.504 21.564.504 27.15l-.082 504.226z"
                    />
                </defs>
                <linearGradient
                    id="htwasqiconb-chat"
                    gradientUnits="userSpaceOnUse"
                    x1="512.001"
                    y1=".978"
                    x2="512.001"
                    y2="1025.023"
                >
                    <stop offset="0" stopColor="#61fd7d" />
                    <stop offset="1" stopColor="#2bb826" />
                </linearGradient>
                <use
                    href="#htwasqicona-chat"
                    fill="url(#htwasqiconb-chat)"
                />
                <g>
                    <path
                        fill="#FFF"
                        d="M783.302 243.246c-69.329-69.387-161.529-107.619-259.763-107.658-202.402 0-367.133 164.668-367.214 367.072-.026 64.699 16.883 127.854 49.017 183.522l-52.096 190.229 194.665-51.047c53.636 29.244 114.022 44.656 175.482 44.682h.151c202.382 0 367.128-164.688 367.21-367.094.039-98.087-38.121-190.319-107.452-259.706zM523.544 808.047h-.125c-54.767-.021-108.483-14.729-155.344-42.529l-11.146-6.612-115.517 30.293 30.834-112.592-7.259-11.544c-30.552-48.579-46.688-104.729-46.664-162.379.066-168.229 136.985-305.096 305.339-305.096 81.521.031 158.154 31.811 215.779 89.482s89.342 134.332 89.312 215.859c-.066 168.243-136.984 305.118-305.209 305.118zm167.415-228.515c-9.177-4.591-54.286-26.782-62.697-29.843-8.41-3.062-14.526-4.592-20.645 4.592-6.115 9.182-23.699 29.843-29.053 35.964-5.352 6.122-10.704 6.888-19.879 2.296-9.176-4.591-38.74-14.277-73.786-45.526-27.275-24.319-45.691-54.359-51.043-63.543-5.352-9.183-.569-14.146 4.024-18.72 4.127-4.109 9.175-10.713 13.763-16.069 4.587-5.355 6.117-9.183 9.175-15.304 3.059-6.122 1.529-11.479-.765-16.07-2.293-4.591-20.644-49.739-28.29-68.104-7.447-17.886-15.013-15.466-20.645-15.747-5.346-.266-11.469-.322-17.585-.322s-16.057 2.295-24.467 11.478-32.113 31.374-32.113 76.521c0 45.147 32.877 88.764 37.465 94.885 4.588 6.122 64.699 98.771 156.741 138.502 21.892 9.45 38.982 15.094 52.308 19.322 21.98 6.979 41.982 5.995 57.793 3.634 17.628-2.633 54.284-22.189 61.932-43.615 7.646-21.427 7.646-39.791 5.352-43.617-2.294-3.826-8.41-6.122-17.585-10.714z"
                    />
                </g>
            </svg>
        </div>
    );
}
