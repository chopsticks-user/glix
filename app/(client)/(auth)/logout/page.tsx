import {logout} from "@/services/auth";

import {redirect} from "next/navigation";

export default async function Page() {
    await logout();
    return redirect("/");
}