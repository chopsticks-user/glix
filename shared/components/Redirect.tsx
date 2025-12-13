import {redirect} from "next/navigation";

export default function Page({route}: { route: string }) {
    return redirect(route);
}