"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";

export default function NotFound () {
    const router = useRouter();

    // Set the title of the page to "404 - Page Not Found"
    useEffect(() => {
        document.title = 'GetMeAChai 404 - Page Not Found';
    }, []);


    return (
        <main className="min-h-[94vh] w-full flex items-center justify-center">
            <div className="text-center space-y-4">
                <h1 className="text-white font-bold text-3xl">
                    404 - Page Not Found
                </h1>
                <p className="text-gray-300 text-sm">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>
                <div className="flex justify-center gap-4">
                    <button
                        className="bg-red-500 p-2 text-sm font-semibold rounded-lg hover:bg-red-600 transition-colors"
                        onClick={() => router.back()}
                        aria-label="Return to previous page"
                    >
                        Go Back
                    </button>
                    <Link
                        href="/"
                        className="bg-red-500 p-2 text-sm font-semibold rounded-lg hover:bg-red-600 transition-colors"
                        aria-label="Return to homepage"
                    >
                        Go Home
                    </Link>
                </div>
            </div>
        </main>
    );
}