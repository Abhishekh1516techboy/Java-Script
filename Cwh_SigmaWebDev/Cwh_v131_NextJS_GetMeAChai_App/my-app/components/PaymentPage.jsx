"use client";

import Script from "next/script";
import Image from "next/image";
import { initiate, fetchUser, fetchPayments } from "@/actions/useraction";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useSearchParams, useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css"



export default function PaymentPage ({ userName }) {

    // Set page title to "GetMeAChai - Admin Page"
    useEffect(() => {
        document.title = `GetMeAChai - ${userName} - User Page`;
    }, [userName]);

    //   session data fetch from api on page load
    const { data: session } = useSession({ required: false });

    //   search params data fetch from api on page load
    const searchParams = useSearchParams();

    //   router data fetch from api on page load
    const router = useRouter();

    //   state variables
    const [paymentForm, setPaymentForm] = useState({ name: '', message: '', amount: '' }); // form data for payment
    const [currentUser, setCurrentUser] = useState({}); // current user data
    const [payments, setPayments] = useState([]); // payments data 


    // supporters data fetch from api on page load
    useEffect(() => {
        supportersData(); // fetch supporters data from api on page load 

        // fetch user data from api
        if (session?.user?.userName) { // check if user is logged in or not
            fetchUser(session?.user?.userName).then((data) => {
                setPaymentForm({ ...paymentForm, name: data.name }); // set user name in form data on page load
            });
        }

    }, [session]); // re-run the function on session change 


    // fetch payments data from api on page load 
    useEffect(() => {
        // check if payment is done or not and show toast notification if payment is done successfully 
        if (searchParams.get("paymentdone") === "true") { // check if payment is done
            toast.success('Payment completed successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });

            // redirect to user profile page after payment is done successfully after 5 seconds 
            setTimeout(() => {
                router.push(`/${userName}`); // redirect to user profile page
            }, 5000); // redirect after 5 seconds
        }

    }, [searchParams, router, userName])


    // handlechange function for input
    const handleChange = (e) => {
        setPaymentForm({ ...paymentForm, [e.target.name]: e.target.value }); // set form data on input change
    }

    // fetch user data from api
    const supportersData = async () => {
        let u = await fetchUser(userName); // fetch user data 
        setCurrentUser(u); // set user data
        let p = await fetchPayments(userName); // fetch payments data 
        setPayments(p); // set payments data
    }


    // Razorpay payment gateway
    const pay = async (amount) => {

        try {
            // Get the order from initiate
            const orderResponse = await initiate(amount, userName, paymentForm, session);

            // Check if initiation failed 
            if (!orderResponse.success) {
                toast.error(orderResponse.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                    transition: Bounce,
                });
            }

            const orderId = orderResponse.orderID; // OrderId for Payments
            
            // options
            const options = {
                "key": currentUser?.razorpayId, // Enter the Key ID generated from the Dashboard
                "amount": amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                "currency": "INR",
                "name": "GetMeAChai", //your business name
                "description": "Chai Transaction",
                "image": "/coffee.gif",
                "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`, // Pass the callback URL dynamically
                "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                    "name": `${session?.user?.userName}`, //your customer's name
                    "email": `${session?.user?.email}`, //your customer's email
                    "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
                },
                "notes": {
                    "address": "GetMeAChai Office Bharat"
                },
                "theme": {
                    "color": "#3399cc"
                },
            };

            // Create a new Razorpay instance and open the Checkout form
            const rzp1 = new Razorpay(options);
            return rzp1.open(); // Open the Razorpay Checkout form
        } catch (error) {
            return {
                success: false,
                message: `Error in pay function, ${error.message}`,
            };
        }
    }

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

            {/* Razorpay Checkout Script */}
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            {/* Main Content */}
            <main className="w-full ">
                <div className="w-full h-[25vh] sm:h-[40vh] mt-10">
                    <Image
                        src={currentUser?.coverPic || "/poster.jpg"} // Correct public folder path
                        alt="User-Account Poster"
                        width={2000}
                        height={2000}
                        className="object-fill  object-center w-full h-full"
                    />
                </div>

                <div className="w-full h-[30vh] relative flex justify-start sm:justify-center items-center flex-col pt-10 gap-0 sm:gap-1">
                    <Image
                        src={currentUser?.profilePic || "/admin.png"} // Correct public folder path
                        alt="Admin-DP"
                        width={500}
                        height={500}
                        className="size-24 sm:size-28 rounded-xl object-cover object-center absolute -top-16 bg-yellow-400"
                    />
                    <h1 className="text-white text-2xl sm:text-3xl font-bold capitalize">{currentUser?.userName}
                        {/* if user Login Show Green Tick */}
                        {session?.user.userName === userName && "✅"}
                    </h1>

                    {session?.user?.userName !== userName &&
                        <p className="text-white text-sm">Let help {session?.user?.userName} get me a Chai</p>
                    }

                    <h4 className="text-gray-400 text-sm font-medium ">
                        Donation: {payments.length} <span className="font-extrabold">.</span>  Total Fund Raise: ₹{payments.reduce((total, payment) => total + payment.amount, 0)}
                    </h4>

                    <button style={{ backgroundColor: '#FD0000' }} onClick={() => router.push("/login")} className="px-16 py-2 mt-2 rounded-lg text-white font-medium">Join for free</button>
                </div>

                <div className="w-full flex justify-center items-center sm:h-[60vh] flex-col-reverse sm:flex-row gap-4 p-4">

                    <div className="rounded-2xl w-full sm:w-1/2 h-[50vh] p-2 bg-gray-900 overflow-hidden">
                        <h2 className="text-white text-2xl font-bold w-full text-center">Supporter&#39;s</h2>
                        <ul className="text-gray-300 overflow-y-scroll scrollbar-hide break-words h-full w-full mt-3 lg:px-10 text-center pb-10">

                            {/* If Payments not  Available in database*/}
                            {payments.length === 0 && <h2 className="text-blue-400 text-2xl font-bold w-full flex items-center justify-center h-[80%]">No Payments Available</h2>}

                            {/* supporters data fetched from database */}
                            {payments.map((info, index) => (
                                <li
                                    onClick={() => { // on Click Push User Page
                                        setTimeout(() => {
                                            router.push(info?.from_User);
                                        }, 1000)
                                    }}

                                    key={index} className="bg-gray-800 hover:bg-gray-700 p-1 mt-2 rounded-md  gap-2 flex items-center cursor-pointer"
                                >
                                    <Image
                                        src={info?.profilePic || "/admin.png"}  // Correct public folder path
                                        alt="Supporters-Dp"
                                        width={100}
                                        height={100}
                                        className="size-10 rounded-full object-cover object-center bg-yellow-400"
                                    />
                                    <div className="text-start text-gray-300">
                                        <span className="font-bold">@{info?.from_User}</span> Donate <span className="text-green-500 font-semibold text-lg">₹{info?.amount},</span> <span>{info?.message}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {session?.user.userName !== userName && <div className="w-full h-[50vh] sm:w-1/2  text-white flex flex-col gap-2 pt-2 items-center bg-gray-900 rounded-2xl">
                        <h2 className="text-white text-2xl font-bold w-full text-center">Make a Payment</h2>
                        <div className="flex flex-col lg:w-4/5 w-11/12 gap-2 sm:mt-3">
                            <input onChange={handleChange} value={paymentForm?.name} type="text" name="name" id="" placeholder="Enter Name" className=" p-2 rounded-lg focus:outline-violet-500 outline-none placeholder-slate-400 font-semibold text-gray-300 bg-gray-700" />
                            <input onChange={handleChange} value={paymentForm?.message} type="text" name="message" id="" autoFocus placeholder="Enter Message" className=" p-2 rounded-lg focus:outline-violet-500 outline-none placeholder-slate-400 font-semibold text-gray-300 bg-gray-700" />
                            <input onChange={handleChange} value={paymentForm?.amount} type="number" name="amount" id="" placeholder="Enter Amount" className=" p-2 rounded-lg focus:outline-violet-500 outline-none placeholder-slate-400 font-semibold text-gray-300 bg-gray-700" />
                            <button disabled={!session || !paymentForm.amount || !paymentForm.name || !paymentForm.message} onClick={() => pay(paymentForm.amount)} className="bg-green-500 p-2 disabled:bg-blue-500 disabled:cursor-not-allowed hover:bg-green-600 px-6 rounded-lg">Pay</button>
                        </div>
                        OR
                        <div className="flex sm:gap-10 gap-6">
                            <button onClick={() => { setPaymentForm({ ...paymentForm, amount: 25 }) }} className="bg-gray-600 lg:sm:px-12 px-6 py-1 rounded-lg  hover:bg-gray-700">₹25</button>
                            <button onClick={() => { setPaymentForm({ ...paymentForm, amount: 50 }) }} className="bg-gray-600 lg:sm:px-12 px-6 py-1 rounded-lg  hover:bg-gray-700">₹50</button>
                            <button onClick={() => { setPaymentForm({ ...paymentForm, amount: 125 }) }} className="bg-gray-600 lg:sm:px-12 px-6 py-1 rounded-lg  hover:bg-gray-700">₹125</button>
                        </div>
                    </div>
                    }

                </div>
            </main>
        </>
    );
}
