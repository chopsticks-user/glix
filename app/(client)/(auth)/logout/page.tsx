"use client";

import {logout} from "@/services/auth";

import {useRouter} from "next/navigation";
import {useEffect} from "react";

export default function Page() {
    const router = useRouter();

    useEffect(() => {
        logout().then(() => router.push("/login"));
    }, []);

    return null;
}