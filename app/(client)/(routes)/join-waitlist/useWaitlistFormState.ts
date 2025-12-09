import addToWaitlist from "@/app/(client)/(routes)/join-waitlist/addToWaitlist";

import {useActionState} from "react";

export default function useWaitlistFormState() {
    return useActionState(
        addToWaitlist, {
            success: false,
            message: "",
            data: {
                email: "",
            },
        }
    );
}