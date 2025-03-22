"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function About () {
    //   router data fetch from api on page load
    const router = useRouter();

     // Set the title of the page to "404 - Page Not Found"
     useEffect(() => {
        document.title = 'GetMeAChai - About Page - Crowdfunding for Chai Lovers';
    }, []);



    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center mt-5">
            <div className="w-11/12 lg:w-full bg-gray-900 shadow-xl  md:p-12 pt-8 text-center transform transition-all hover:shadow-2xl">
                {/* Header with a Chai Accent */}
                <h1 className="text-2xl md:text-4xl font-extrabold text-white relative">
                    About GetMeAChai
                </h1>
                <p className="mt-3 md:mt-6 text-white text-lg md:text-xl leading-relaxed">
                    GetMeAChai is a crowdfunding platform designed for <span className="font-semibold text-amber-500">creators, chai lovers, and entrepreneurs</span> who want to bring their ideas to life with the support of their community. Whether you&apos;re an independent developer, an artist, or a chai vendor, our platform allows your supporters to fuel your passion—one cup at a time.
                </p>

                {/* Section 1: How It Works */}
                <div className="mt-10 bg-gray-800 rounded-xl p-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-white">How It Works</h2>
                    <p className="mt-4 text-white text-lg leading-relaxed">
                        Setting up your crowdfunding page is as easy as brewing a cup of chai: create your profile, share your story, and invite your fans to support you by “buying you a chai.” Every contribution brings you closer to your dreams—whether it’s launching a project, sustaining your craft, or growing your chai-loving community.
                    </p>
                </div>

                {/* Section 2: Why Join */}
                <div className="mt-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-white">Why Join GetMeAChai?</h2>
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                        <div className="bg-gray-900 border border-gray-500 rounded-lg p-5 hover:bg-gray-800 transition-colors">
                            <h3 className="font-semibold text-amber-500">For Creators</h3>
                            <p className="mt-2 text-white">Turn your passion into a sustainable career with direct support from your fans.</p>
                        </div>
                        <div className="bg-gray-900 border border-gray-500 rounded-lg p-5 hover:bg-gray-800 transition-colors">
                            <h3 className="font-semibold text-amber-500">For Supporters</h3>
                            <p className="mt-2 text-white">Make a real impact on the projects and people you love.</p>
                        </div>
                        <div className="bg-gray-900 border border-gray-500 rounded-lg p-5 hover:bg-gray-800 transition-colors">
                            <h3 className="font-semibold text-amber-500">For Chai Lovers</h3>
                            <p className="mt-2 text-white">Celebrate the culture of chai and its power to unite us.</p>
                        </div>
                    </div>
                </div>

                {/* Section 3: Call to Action */}
                <div className="mt-10 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl p-4 md:p-8">
                    <h2 className="text-2xl md:text-3xl font-bold">Join Us Today</h2>
                    <p className="mt-4 text-lg leading-relaxed">
                        At GetMeAChai, we’re brewing a movement rooted in <span className="font-semibold">community, creativity, and chai</span>. Whether you’re here to support or be supported, you’re part of something special. Start your journey with us today and let’s make every sip count!
                    </p>
                    <button onClick={() => router.push("/login")} className="mt-6 px-6 py-3 bg-white text-amber-600 font-semibold gray-800-full hover:bg-amber-200 transition-colors rounded-md">
                        Get Started
                    </button>
                </div>

                {/* Footer Quote */}
                <p className="mt-8 text-gray-300 italic text-md">
                    “Because every great idea starts with a spark—and a little chai to keep it brewing. ❤️❤️”
                </p>
            </div>
        </div>
    );
}