import Image from "next/image";
import AutoScrollGallery from "@/components/AutoScrollGallery";
import Link from "next/link";

export const metadata = {
  title: "GetMeAChai - Home Page - Crowdfunding for Chai Lovers",
};

export default function Home () {

  return (
    <>
      <main className="relative bg-black select-none w-screen">
        {/*section */}
        <section className="relative overflow-hidden h-screen w-full flex flex-col justify-center items-center gap-3 object-cover z-20">
          <Image
            src={"/homePoster.webp"}
            alt="Background poster of a serene coffee shop"
            fill
            className="z-0 object-cover object-center"
          />

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white flex items-center gap-1 z-10">
            Buy me a Chai
            <Image
              src={"/coffee.gif"}
              width={45}
              height={45}
              alt="coffee cup gif"
              className=" object-cover object-center h-8 sm:h-11 w-auto"
            />
          </h1>

          <p className="text-gray-200 font-mono text-center max-w-xl z-10">
            A crowdfunding platform for developers. Get funded by your friends and followers. Start now!
          </p>

          <div className="space-x-4 text-white z-10">
            <Link href="/login">
              <button className="w-50 bg-violet-700 hover:bg-violet-800 transition-all duration-300 rounded-lg font-semibold px-3 py-1 sm:py-2 focus:outline-none focus:ring-2 focus:ring-violet-500">
                Start Now
              </button>
            </Link>
            <Link href="/about">
              <button className="w-50 bg-blue-500 hover:bg-blue-600 transition-all duration-300 rounded-lg font-semibold px-3 py-1 sm:py-2 focus:outline-none focus:ring-1 sm:ring-2 focus:ring-blue-400">
                Read More
              </button>
            </Link>
          </div>
        </section>

        {/* section */}
        <section className="h-screen w-full overflow-hidden"></section>
        <section className="h-screen w-full overflow-hidden fixed top-12 z-0">
          <video
            src="/homeVideo1.mp4"
            loop muted autoPlay
            className="lg:object-cover object-fill w-full h-full"
          >
          </video>
        </section>

        {/*section */}
        <section className="h-screen w-full bg-black flex justify-start overflow-hidden flex-col sticky top-0 z-20">
          <h2 className="text-2xl sm:text-5xl font-bold text-white text-center my-16">
            Your fans can Buy You A Chai
          </h2>
          <div className=" h-full flex justify-around lg:items-start items-center flex-col lg:flex-row lg:py-16 gap-5 lg:gap-0 overflow-y-scroll lg:overflow-hidden pb-8">

            <div className="overflow-hidden flex flex-col items-center text-center space-y-2 border-2 border-slate-400 p-4 rounded-2xl">
              <Image
                src={"/cultur.gif"}
                width={70}
                height={70}
                alt="Animated coffee cup"
                className="inline-block bg-slate-400 p-1 lg:p-2 rounded-full w-auto lg:h-20 h-14"
              />
              <p className="text-white font-semibold">Fan Want To Help</p>
              <p className="text-gray-200 font-mono text-sm">Your fans Are Available for Funding</p>
            </div>

            <div className="overflow-hidden flex flex-col items-center text-center space-y-2 border-2 border-slate-400 p-4 rounded-2xl">
              <Image
                src={"/moneda.gif"}
                width={70}
                height={70}
                alt="Animated coffee cup"
                className="inline-block bg-slate-400 p-1 lg:p-2 rounded-full w-auto lg:h-20 h-14"
              />
              <p className="text-white font-semibold">Fan Want To Help</p>
              <p className="text-gray-200 font-mono text-sm">Your fans Are Available for Funding</p>
            </div>

            <div className="overflow-hidden flex flex-col items-center text-center space-y-2 border-2 border-slate-400 p-4 rounded-2xl">
              <Image
                src={"/joypixels.gif"}
                width={70}
                height={70}
                alt="Animated coffee cup"
                className="inline-block bg-slate-400 p-1 lg:p-2 rounded-full w-auto lg:h-20 h-14"
              />
              <p className="text-white font-semibold">Fan want to help</p>
              <p className="text-gray-200 font-mono text-sm">Your fans are available for funding</p>
            </div>
          </div>
        </section>

        {/*section */}
        <section className="h-screen w-full flex justify-center items-center overflow-hidden z-20 sticky top-0">
          <video
            src="/homeVideo2.mp4"
            autoPlay loop muted
            className="lg:object-cover object-fill w-full h-full"
          >
          </video>
        </section>

        {/* section */}
        <section className="lg:h-screen h-full w-full relative overflow-hidden top-10 z-20 bg-gray-950 flex flex-col">
          <h1 className="text-white text-5xl sm:text-8xl text-center py-3 lg:mt-8 font-sans">Our Services</h1>
          <div className="flex justify-between flex-col-reverse mb-5 lg:mb-0 lg:flex-row items-center h-full w-full ">

            <div className="h-[50vh] lg:w-[37vw] w-[95vw] rounded-3xl border-sky-100 text-white flex flex-col justify-center items-center lg:justify-end gap-3 lg:gap-8">
              <h2 className="sm:w-2/3 w-11/12 text-3xl lg:text-7xl font-semibold">Branding</h2>
              <p className="text-start sm:w-2/3 w-11/12  text-xl font-normal text-gray-300">Our strength lies in branding, and our focus is entirely on you. Your brand, your vision, and your goals are at the heart of everything we do.</p>
              <span className="sm:w-2/3 w-11/12 text-start font-semibold text-slate-200 text-lg">Know More &gt;</span>
            </div>
            {/* Auto scrollable Gallery */}
            <AutoScrollGallery />
          </div>
        </section>
      </main>
    </>
  );
}
