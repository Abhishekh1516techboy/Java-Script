import Image from "next/image";
import Link from "next/link";

export default function Logo () {
    return (
        <div className="w-2/3 h-full flex items-center justify-start sm:pl-2">
            <Link href="/">
                <h2 className="cursor-pointer text-lg sm:text-2xl  font-bold text-white flex items-center justify-center gap-1 h-full w-full">
                    GetMeAChai
                    <Image
                        src={"/coffee.gif"}
                        width={28}
                        height={28}
                        alt="Animated teacup gif representing chai"
                        className="object-cover object-center sm:h-8 h-6 w-auto mb-2"
                    />
                </h2>
            </Link>
        </div>

    );
}
