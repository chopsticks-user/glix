import {logout} from "@/shared/actions/auth";

import {redirect} from "next/navigation";

export default async function Page() {
    await logout();
    return redirect("/");
}