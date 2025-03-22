"use client";

import { useState, useEffect } from "react";
import { fetchUser, updateProfile } from "@/actions/useraction";
import { useSession } from "next-auth/react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

export default function Dashboard () {

    // Fetch session data from API on page load and update form state with user profile data if available
    const { data: session, update } = useSession({ required: false });

    const [form, setForm] = useState({}); // State for form data for user profile

    // Set page title to "GetMeAChai - Dashboard Page"
    useEffect(() => {
        document.title = `GetMeAChai - Dashboard Page ${session?.user?.userName}`;
    }, [session]);


    //  Fetch user data from API on page load
    useEffect(() => {
        if (session?.user?.userName) {
            fetchUser(session.user.userName).then((data) => {
                setForm(data || {}); // Set form data with user profile data if available
            });
        }
    }, [session]); // Fetch user data on page load


    // Handle change function for input fields in the form
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value }); // Set form data on input change
    };

    // Handle form submission 
    const handleSubmit = async (e) => {

        // Try to update profile data in the database 
        try {
            const updateResponse = await updateProfile(e, session?.user?.userName); // Update the profile data in the database

            // Check if updatedProfile failed
            if (!updateResponse.success) {
                toast.error(updateResponse.message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
            } else {
                // on successful update of the profile 
                toast.success('Profile Update Successfully', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
            }

            update(); // Refresh session after update

        } catch (error) {
            console.error("Error in handleSubmit function:", error);
        }
    };


    return (
        <>
            {/* Toast Container */}
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Bounce}
                className="!top-2 !top-right"
            />

            <div className="h-[94vh] flex flex-col lg:justify-center justify-end items-center gap-2">
                <h1 className="text-white lg:text-3xl text-xl font-bold">Welcome to your Dashboard</h1>
                <div className="sm:w-1/2 w-11/12 rounded-xl overflow-hidden">
                    <form action={handleSubmit} className="h-full w-full flex flex-col gap-1">
                        {/* Name */}
                        <div className="flex flex-col p-1">
                            <label htmlFor="name" className="text-gray-200 font-semibold">Name</label>
                            <input
                                disabled
                                value={form.name || ""}
                                onChange={handleChange}
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Enter Name"
                                className="cursor-not-allowed p-1 pl-2 bg-gray-700 rounded-lg text-gray-300 font-semibold outline-none focus:outline-violet-500"
                            />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col p-1">
                            <label htmlFor="email" className="text-gray-200 font-semibold">Email</label>
                            <input
                                disabled
                                value={form.email || ""}
                                onChange={handleChange}
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter Email"
                                className="cursor-not-allowed p-1 pl-2 bg-gray-700 rounded-lg text-gray-300 font-semibold outline-none focus:outline-violet-500"
                            />
                        </div>

                        {/* User Name */}
                        <div className="flex flex-col p-1">
                            <label htmlFor="userName" className="text-gray-200 font-semibold">User-Name</label>
                            <input
                                autoFocus
                                value={form.userName || ""}
                                onChange={handleChange}
                                type="text"
                                name="userName"
                                id="userName"
                                placeholder="Enter UserName"
                                className="p-1 pl-2 bg-gray-700 rounded-lg text-gray-300 font-semibold outline-none focus:outline-violet-500"
                            />
                        </div>

                        {/* Profile Picture */}
                        <div className="flex flex-col p-1">
                            <label htmlFor="profilePic" className="text-gray-200 font-semibold">Profile-Picture</label>
                            <input
                                value={form.profilePic || ""}
                                onChange={handleChange}
                                type="text"
                                name="profilePic"
                                id="profilePic"
                                placeholder="Paste Image Link from unsplash.com & pexels.com Only"
                                className="p-1 pl-2 bg-gray-700 rounded-lg text-gray-300 font-semibold outline-none focus:outline-violet-500"
                            />
                        </div>

                        {/* Cover Picture */}
                        <div className="flex flex-col p-1">
                            <label htmlFor="coverPic" className="text-gray-200 font-semibold">Cover-Picture</label>
                            <input
                                value={form.coverPic || ""}
                                onChange={handleChange}
                                type="text"
                                name="coverPic"
                                id="coverPic"
                                placeholder="Paste Image Link from unsplash.com & pexels.com Only"
                                className="p-1 pl-2 bg-gray-700 rounded-lg text-gray-300 font-semibold outline-none focus:outline-violet-500"
                            />
                        </div>

                        {/* RazorPay ID */}
                        <div className="flex flex-col p-1">
                            <label htmlFor="razorpayId" className="text-gray-200 font-semibold">RazorPay ID</label>
                            <input
                                value={form.razorpayId || ""}
                                onChange={handleChange}
                                type="password"
                                name="razorpayId"
                                id="razorpayId"
                                placeholder="Enter RazorPay ID"
                                className="p-1 pl-2 bg-gray-700 rounded-lg text-gray-300 font-semibold outline-none focus:outline-violet-500"
                            />
                        </div>

                        {/* RazorPay Secret */}
                        <div className="flex flex-col p-1">
                            <label htmlFor="razorpaySecret" className="text-gray-200 font-semibold">RazorPay Secret</label>
                            <input
                                value={form.razorpaySecret || ""}
                                onChange={handleChange}
                                type="password"
                                name="razorpaySecret"
                                id="razorpaySecret"
                                placeholder="RazorPay Secret"
                                className="p-1 pl-2 bg-gray-700 rounded-lg text-gray-300 font-semibold outline-none focus:outline-violet-500"
                            />
                        </div>

                        {/* Save Button */}
                        <div className="flex flex-col p-1">
                            <button
                                type="submit"
                                className="bg-blue-600 p-1 rounded-lg outline-none focus:bg-green-500 hover:bg-blue-700 text-white transition-colors duration-200"
                            >
                                Update Profile
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
