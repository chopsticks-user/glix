export default function Page() {
    return null;
    // const searchParams = useSearchParams();
    // const [state, action, pending] = useActionState(
    //     signup, {
    //         success: false,
    //         message: "",
    //         data: {
    //             // the url the user received should be: /reset-password?token=${token}
    //             token: searchParams.get("token") ?? "",
    //             newPassword: "",
    //         },
    //     }
    // );
    // const [confirmedNewPassword, setConfirmedNewPassword] = useState("");
    //
    // // todo
    // useEffect(() => {
    //     if (state.success) {
    //         redirect("/login");
    //     }
    // }, [state]);
    //
    // return <div className="bg-slate-50 min-h-screen flex items-center justify-center py-24 px-6">
    //     <div
    //         className="flex flex-col max-w-xl w-full bg-white p-10 rounded-3xl shadow-2xl border border-slate-200 text-center">
    //         <div className={"w-full pb-16 justify-center items-center flex"}>
    //             <span
    //                 className="text-4xl font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">Login</span>
    //         </div>
    //         <form className="space-y-4" action={action}>
    //             <input
    //                 type="password"
    //                 name="password"
    //                 placeholder="Enter your new password"
    //                 className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-lg"
    //                 defaultValue={state.data.newPassword}
    //                 required
    //             />
    //             <input
    //                 type="password"
    //                 name="password"
    //                 placeholder="Confirm your new password"
    //                 className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-lg"
    //                 defaultValue={state.data.newPassword}
    //                 onCopy={e => e.preventDefault()} // disable copy
    //                 onChange={e => setConfirmedNewPassword(e.target.value)}
    //                 required
    //             />
    //             <p aria-live="polite">
    //                 {state?.message ??
    //                 state.data.newPassword !== confirmedNewPassword
    //                     ? "Passwords do not match"
    //                     : ""}
    //             </p>
    //             <button
    //                 className="cursor-pointer w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500 transition-colors text-lg shadow-lg shadow-blue-500/20"
    //                 type="submit" disabled={pending}
    //             >
    //                 Reset password
    //             </button>
    //         </form>
    //     </div>
    // </div>
}