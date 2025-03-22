export default function Home() {
  return (
    <>
      <section
        className="relative w-full h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-6">
          <div>
            <h1 className="text-5xl font-bold leading-tight mb-6">
              Welcome to Our Modern Website
            </h1>
            <p className="text-lg mb-6">
              We design innovative and functional websites that make an impact.
            </p>
            <h3
              href="#services"
              className="bg-yellow-500 text-black py-3 w-80 mx-64 cursor-pointer rounded-full text-lg font-semibold hover:bg-yellow-400 transition duration-300"
            >
              Explore Our Services
            </h3>
          </div>
        </div>
      </section>
    </>
  );
}
