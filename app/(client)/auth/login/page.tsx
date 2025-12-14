import LoginForm from "./LoginForm";
import {auth} from "@/shared/actions/auth";
import {redirect} from "next/navigation";

export default async function Page() {
    const session = await auth();
    if (session.user) {
        return redirect("/admin");
    }
    return <LoginForm/>
}