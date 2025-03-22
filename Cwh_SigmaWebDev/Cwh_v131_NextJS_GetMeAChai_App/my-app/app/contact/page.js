"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { fetchUser } from "@/actions/useraction";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Contact () {

    // Set page title to "GetMeAChai - Contact Page"
    useEffect(() => {
        document.title = "GetMeAChai - Contact Page - Crowdfunding for Chai Lovers";
    }, []);

    // Fetch session data
    const { data: session } = useSession({ required: false });

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    // show tost when contact from submit data in database
    useEffect(() => {
        if (success) {
            toast.success(success, { autoClose: 3000, transition: Bounce });
        }
        if (error) {
            toast.error(error, { autoClose: 3000, transition: Bounce });
        }
    }, [success, error])


    // Set name and email in contact form usig session data 
    useEffect(() => {
        if (session?.user?.userName) {
            fetchUser(session.user.userName)
                .then((data) => {
                    setFormData((prev) => ({
                        ...prev,
                        name: data.name || "",
                        email: data.email || "",
                    }));
                })
                .catch(() => {
                    toast.error("Failed to fetch user data.");
                });
        }
    }, [session, success, error]); // Depend on session, not formData

    // handleChange set data
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // handleSubmit 
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        // ✅ Phone number validation (only numbers and optional "+")
        const phoneRegex = /^[+]?[0-9]+$/;
        if (!phoneRegex.test(formData.phone)) {
            setError("Please enter a valid phone number ❌");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Something went wrong");
            }

            setSuccess("Message sent successfully! ✅");
            setFormData({ name: "", email: "", phone: "", message: "" });
        } catch (err) {
            setError(err.message || "Failed to send message ❌");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Toast Container */}
            <ToastContainer
                position="top-right"
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
                className="!top-12 !top-right"
            />

            <main>
                <section className="w-full flex flex-col lg:flex-row lg:h-[94vh]">

                    {/* Left section (main content for introduction) */}
                    <div className="h-full opacity-0 lg:opacity-100 lg:w-1/2 w-3/4 text-white text-4xl lg:text-9xl font-semibold tracking-wide leading-tight lg:p-20 p-2 lg:mt-12 uppercase">
                        <div className="">Let&#39;s</div>
                        <div className="text-right">Get In</div>
                        <div className="flex items-center justify-between">Touch
                            <svg className="lg:h-[110px] lg:w-[110px] h-12 w-12" fill="#ffffff" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" xmlSpace="preserve" stroke="#ffffff">
                                <g >
                                    <g>
                                        <g>
                                            <path d="M389.565,400 bg-gray-950 border.696h-66.783c-9.22,0-16.696,7.475-16.696,16.696s7.475,16.696,16.696,16.696h66.783c9.22,0,16.696-7.475,16.696-16.696S398.785,400 bg-gray-950 border.696,389.565,400 bg-gray-950 border.696z"></path>
                                        </g>
                                    </g>
                                    <g>
                                        <g>
                                            <path d="M472.645,474.965c-3.899-92.646-65.593-169.236-148.063-196.743c15.753-11.455,28.545-26.742,36.996-44.483h27.987c27.618,0,50.087-22.469,50.087-50.087C439.653,82.386,357.267,0,256.001,0S72.349,82.386,72.349,183.652c0,27.618,22.469,50.087,50.087,50.087h27.987c8.45,17.741,21.244,33.027,36.996,44.483C105.79,305.448,43.292,381.461,39.357,474.965c-0.532,2.391-0.398,2.187-0.398,20.34c0,9.22,7.475,16.696,16.696,16.696H456.35c9.22,0,16.696-7.475,16.696-16.696C473.043,476.888,473.165,477.306,472.645,474.965z M406.261,183.652c0,9.206-7.49,16.696-16.696,16.696h-17.893c1.596-11.109,1.598-22.269,0-33.391h17.893C398.772,166.957,406.261,174.446,406.261,183.652z M140.328,200.348h-17.893c-9.206,0-16.696-7.49-16.696-16.696c0-9.206,7.49-16.696,16.696-16.696h17.893C138.732,178.064,138.73,189.225,140.328,200.348z M150.422,133.565c-30.531,0-30.89-0.209-36.339,0.709C134.556,75.603,190.436,33.391,256,33.391s121.444,42.212,141.916,100.883c-5.502-0.927-5.928-0.709-36.339-0.709c-18.79-39.45-59.05-66.783-105.578-66.783S169.212,94.116,150.422,133.565z M172.522,183.652c0-46.03,37.448-83.478,83.478-83.478c46.03,0,83.478,37.448,83.478,83.478c0,5.717-0.58,11.3-1.68,16.696H256c-9.22,0-16.696,7.475-16.696,16.696c0,9.22,7.475,16.696,16.696,16.696h66.737C307.491,254.001,283.252,267.13,256,267.13C209.97,267.13,172.522,229.682,172.522,183.652z M239.304,478.609H72.636c1.754-57.981,31.097-109.548,75.044-142.081l91.625,91.625V478.609z M177.087,318.713c24.003-11.64,50.797-18.192,78.913-18.192c28.116,0,54.91,6.551,78.911,18.192L256,397.625L177.087,318.713z M272.695,478.609v-50.456l91.625-91.625c43.946,32.533,73.289,84.102,75.044,142.081H272.695z"></path>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </div>
                    </div>

                    {/* Right section (Contact Form) */}
                    <div className="h-full lg:w-1/2 w-full flex flex-col justify-center items-center">
                        <form onSubmit={handleSubmit} className="sm:w-10/12 w-11/12 flex flex-col gap-5">
                            <input
                                type="text"
                                name="name"
                                required
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="h-12 rounded-xl text-white sm:text-xl p-2 placeholder-gray-300 bg-transparent border outline-none focus:border-violet-400"
                            />
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="h-12 rounded-xl text-white sm:text-xl p-2 placeholder-gray-300 bg-transparent border outline-none focus:border-violet-400"
                            />
                            <input
                                type="tel"
                                name="phone"
                                required
                                placeholder="Phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="h-12 rounded-xl text-white sm:text-xl p-2 placeholder-gray-300 bg-transparent border outline-none focus:border-violet-400"
                                pattern="[0-9]+" // ✅ Only allows numbers
                                title="Phone number must contain only digits."
                            />
                            <textarea
                                name="message"
                                placeholder="Message"
                                value={formData.message}
                                onChange={handleChange}
                                className="h-24 rounded-xl text-white sm:text-xl p-2 placeholder-gray-300 bg-transparent border outline-none focus:border-violet-400"
                            ></textarea>

                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-blue-700 focus:bg-green-600 transition-all duration-200 cursor-pointer text-white font-semibold text-xl w-full h-12 rounded-lg"
                            >
                                {loading ? "Submitting..." : "Submit"}
                            </button>
                        </form>
                    </div>
                </section>
            </main>
        </>
    );
}
