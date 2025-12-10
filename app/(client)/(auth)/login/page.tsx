import LoginForm from "./LoginForm";
import {auth} from "@/services/auth";
import {redirect} from "next/navigation";

export default async function Page() {
    const session = await auth();
    if (session.user) {
        return redirect("/dashboard");
    }
    return <LoginForm/>
}