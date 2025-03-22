'use client'

import React, { useRef, useEffect } from "react";
import Image from "next/image";

export default function AutoScrollGallery () {

    const scrollRef = useRef(null);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        let scrollStep = 2; // Amount to scroll each step
        const scrollInterval = 30; // Interval in milliseconds

        let startScroll = setInterval(() => {
            if (
                scrollContainer.scrollLeft + scrollContainer.clientWidth >=
                scrollContainer.scrollWidth
            ) {
                // Reset to the beginning if reached the end
                scrollContainer.scrollLeft = 0;
            } else {
                scrollContainer.scrollLeft += scrollStep;
            }
        }, scrollInterval);

        return () => {
            clearInterval(startScroll);
        };
    }, []);

    // Array of image source links
    const imageSources = [
        "/scrollPic1.jpg",
        "/scrollPic2.jpg",
        "/scrollPic3.jpg",
        "/scrollPic4.jpg",
        "/scrollPic5.jpg",
        "/scrollPic6.jpg",
        "/scrollPic7.jpg",
    ];

    return (
        <div ref={scrollRef} className="cursor-grab h-[60vh] lg:h-[60vh] w-[90vw] lg:w-[60vw] rounded-3xl overflow-hidden flex flex-col flex-wrap gap-3 overflow-x-scroll scrollbar-hide">
            {imageSources.map((src, index) => (
                <div key={index} className="h-full min-w-[40%] rounded-3xl overflow-hidden">
                    <Image
                        src={src}
                        alt={`Image ${index + 1}`}
                        width={500}
                        height={500}
                        className="min-w-fit h-full object-fill object-center hover:scale-105 transition-all duration-500"
                    />
                </div>
            ))
            }
        </div >
    );
}



