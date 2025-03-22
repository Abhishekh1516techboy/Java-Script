export default function Footer () {
    return (
        <footer className="select-none bg-black h-12 w-full flex justify-center items-center font-semibold z-20 relative">
            <p className="text-white text-xs sm:text-lg">Copyright &copy;{new Date().getFullYear()} GetMeAChai-All Right resirved </p>
        </footer>
    );
}