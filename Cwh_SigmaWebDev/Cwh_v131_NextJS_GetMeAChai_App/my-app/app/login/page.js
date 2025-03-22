"use client"

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect} from 'react';
import { useSession, signIn, signOut } from "next-auth/react"

export default function Login () {

    // Set page title to "GetMeAChai - Login Page"
    useEffect(() => {
        document.title = "GetMeAChai - Login Page - Crowdfunding for Chai Lovers";
    }, []);

    const router = useRouter();
    const { data: session } = useSession({ required: false });

    // Redirect authenticated users
    useEffect(() => {
        if (session) {
            router.push("/dashboard");
        }
    }, [session, router]);


    // State hooks to track if user is in login mode or forgot password mode
    const [isLogin, setIsLogin] = useState(true);
    const [isForgotPassword, setIsForgotPassword] = useState(false);


    // Functions to handle Google and GitHub login
    const handleGithubLogin = () => {
        signIn("github"); // GithHub Login
    };

    const handleGoogleLogin = () => {
        signIn("google"); // Google Login
    };


    // If in forgot password mode, render the forgot password form
    if (isForgotPassword) {
        return (
            <div className="flex min-h-screen p-2 items-center justify-center select-none">
                <div className="w-full max-w-xl p-4 sm:p-8 bg-white rounded-lg shadow-lg">
                    {/* Forgot Password Title */}
                    <h2 className="mb-4 text-2xl font-bold text-center">Forgot Password</h2>
                    {/* Instructions for password reset */}
                    <p className="mb-4 text-sm text-gray-700 text-center">
                        Enter your email address, and we&#39;ll send you a link to reset your password.
                    </p>
                    {/* Forgot Password Form */}
                    <form>
                        {/* Email input for password reset */}
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                                Email Address
                            </label>
                            <input
                                className="cursor-not-allowed w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                id="email"
                                type="email"
                                placeholder="Email Address"
                                disabled
                            />
                        </div>
                        {/* Button to send the reset link */}
                        <button
                            className="cursor-not-allowed w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                            type="button"
                            disabled
                        >
                            Send Reset Link
                        </button>
                    </form>
                    {/* Link to go back to login screen */}
                    <p className="mt-4 text-center text-sm">
                        <Link
                            className="font-bold text-blue-500 hover:text-blue-800"
                            href="/login"
                            onClick={() => setIsForgotPassword(false)}
                        >
                            Back to Login
                        </Link>
                    </p>
                </div>
            </div>
        );
    }

    // Main login or register form
    return (
        <main>
            <section>
                <div className="flex min-h-[94vh] mt-10 items-center justify-center select-none">

                    <div className="flex flex-col  sm:flex-row w-full p-2 lg:p-0 max-w-screen-lg  rounded-lg  shadow-lg ">

                        {/* Left side for login or registration */}
                        <div className="sm:w-3/5 p-4 sm:p-8 bg-white sm:rounded-r-none rounded-lg">
                            {/* Dynamic title for login or registration */}
                            <h2 className="mb-2 text-xl sm:text-2xl font-bold">
                                {isLogin ? 'Sign Into Your Account' : 'Create An Account'}
                            </h2>
                            {/* Toggle between Login and Register */}
                            <div className="flex mb-2">
                                <button
                                    className={`px-4 py-2 font-semibold ${isLogin ? 'border-b-2 border-blue-500' : ''}`}
                                    onClick={() => setIsLogin(true)}
                                >
                                    LOGIN
                                </button>
                                <button
                                    className={`px-4 py-2 font-semibold ${!isLogin ? 'border-b-2 border-blue-500' : ''}`}
                                    onClick={() => setIsLogin(false)}
                                >
                                    REGISTER
                                </button>
                            </div>
                            {/* Login or Register Form */}
                            <form>
                                {/* Full Name input shown only for registration */}
                                {!isLogin && (
                                    <div className="mb-2">
                                        <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="full-name">
                                            Full Name
                                        </label>
                                        <input
                                            className="cursor-not-allowed w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                            id="full-name"
                                            type="text"
                                            placeholder="Full Name"
                                            disabled
                                        />
                                    </div>
                                )}
                                {/* Email Address input */}
                                <div className="mb-2">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                                        Email Address
                                    </label>
                                    <input
                                        className="cursor-not-allowed w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="email"
                                        type="email"
                                        placeholder="Email Address"
                                        disabled
                                    />
                                </div>
                                {/* Password input */}
                                <div className="mb-2">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                                        Password
                                    </label>
                                    <input
                                        className="cursor-not-allowed w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="password"
                                        type="password"
                                        placeholder="Password"
                                        disabled
                                    />
                                </div>
                                {/* Checkbox for agreeing to terms (only for registration) */}
                                {!isLogin && (
                                    <div className="mb-4">
                                        <label className="inline-flex items-center">
                                            <input type="checkbox" className="form-checkbox" disabled/>
                                            <span className="ml-2 text-sm text-gray-700">I agree to the terms of service</span>
                                        </label>
                                    </div>
                                )}
                                {/* Submit button */}
                                <div className="flex items-center justify-between">
                                    <button
                                        className="cursor-not-allowed px-6 py-1 sm:py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-non focus:shadow-outline"
                                        type="button"
                                        disabled
                                    >
                                        {isLogin ? 'Login' : 'Register'}
                                    </button>
                                    {/* Link to switch to forgot password if in login mode */}
                                    {isLogin && (
                                        <Link
                                            className="inline-block text-sm font-bold text-blue-500 align-baseline hover:text-blue-800"
                                            href="/login"
                                            onClick={() => setIsForgotPassword(true)}
                                        >
                                            Forgot Password?
                                        </Link>
                                    )}
                                </div>
                            </form>
                            {/* Social media login buttons */}
                            <div className="mt-2">
                                <p className="mb-2 text-center text-gray-600">OR</p>
                                <div className="flex flex-col lg:flex-row justify-center gap-4">
                                    {/* Google login button */}
                                    <button
                                        className="flex items-center justify-center px-4 py-2 font-bold text-white bg-red-600 rounded hover:bg-red-600 focus:outline-none focus:shadow-outline"
                                        onClick={handleGoogleLogin}
                                    >
                                        <svg className="w-5 h-5 mr-2" viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" fill="#000000">
                                            <g id="SVGRepo_iconCarrier">
                                                <path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4"></path>
                                                <path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853"></path>
                                                <path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05"></path>
                                                <path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335"></path>
                                            </g>
                                        </svg>
                                        Login With Google
                                    </button>
                                    {/* GitHub login button */}
                                    <button
                                        className="flex items-center justify-center px-4 py-2 font-bold text-white bg-gray-800 rounded hover:bg-gray-900 focus:outline-none focus:shadow-outline"
                                        onClick={handleGithubLogin}
                                    >
                                        <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.083-.729.083-.729 1.205.085 1.84 1.236 1.84 1.236 1.07 1.834 2.807 1.304 3.492.998.108-.775.42-1.304.763-1.604-2.665-.305-5.467-1.333-5.467-5.93 0-1.31.467-2.38 1.235-3.22-.123-.303-.535-1.524.118-3.176 0 0 1.007-.323 3.3 1.23.957-.266 1.983-.398 3.003-.403 1.02.005 2.047.137 3.003.403 2.292-1.554 3.3-1.23 3.3-1.23.653 1.653.242 2.873.12 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.806 5.624-5.478 5.92.43.372.823 1.102.823 2.22 0 1.604-.014 2.896-.014 3.292 0 .32.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                                        Login With GitHub
                                    </button>
                                </div>
                            </div>
                            {/* Link to switch between login and register modes */}
                            <p className="mt-4 text-center text-sm">
                                {isLogin ? (
                                    "Don't have an account? "
                                ) : (
                                    "Already a member? "
                                )}
                                <Link
                                    className="font-bold text-blue-500 hover:text-blue-800"
                                    href="/login"
                                    onClick={() => setIsLogin(!isLogin)}
                                >
                                    {isLogin ? 'Register here' : 'Login here'}
                                </Link>
                            </p>
                        </div>

                        {/* Right side with branding */}
                        <div className="hidden relative overflow-hidden sm:flex flex-col items-center justify-start w-2/5 pt-10 rounded-r-lg">
                            <div className='flex gap-1 z-10'>
                                <h2 className="mb-3 text-3xl font-bold text-white z-10">GetMeAChai</h2>
                                <Image
                                    src="/coffee.gif"
                                    width={100}
                                    height={100}
                                    alt="Animated teacup gif representing chai"
                                    className="object-cover object-center h-8 w-auto z-10"
                                />
                            </div>
                            <p className="mb-4 text-white z-10">WELCOME TO GetMeAChai</p>
                            <Image
                                src="/cupGlass.Avif"
                                alt="GetMeAChai Logo"
                                width={1000}
                                height={1000}
                                className="absolute inset-0 w-full h-full object-cover z-0"
                            />
                        </div>

                    </div>

                </div>
            </section>
        </main>
    );
}
