"use client";

import { useParams, useRouter } from "next/navigation";

export default function Page () {

    const params = useParams();
    const router = useRouter();

    return (
        <div>
            this is {params.slug}
            <button className="bg-blue-400 p-2 ml-2 mt-2" type="button" onClick={()=>router.push("/dashboard")}>
                Dashboard
            </button>
        </div>
    );
}