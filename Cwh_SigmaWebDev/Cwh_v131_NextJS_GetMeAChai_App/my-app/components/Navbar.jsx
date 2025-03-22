import Logo from "@/components/Logo";
import Navlinks from "@/components/Navlinks";

export default function Navbar () {
    return (
        <header className="select-none bg-gray-950 flex items-center px-2 h-11 w-full z-50 fixed top-0 right-0" aria-label="Main Navigation">
            <Logo />
            <nav className="flex justify-center items-center h-10 w-5/6" aria-label="Primary Navigation">
                <Navlinks />
            </nav>
        </header>
    );
}
