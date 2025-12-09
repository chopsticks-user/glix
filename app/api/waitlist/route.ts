import db from "@/lib/mongodb";

import {NextResponse} from "next/server";
import {stringify} from "csv-stringify/sync";

export async function GET() {
    const docs = await (db.collection("waitlist").find().toArray());
    const waitlist = docs.map(doc => ({Email: doc.email!}));

    return new NextResponse(stringify(waitlist, {
        header: true,
        columns: ["Email"],
    }), {
        headers: {
            "Content-Type": "text/csv",
            "Content-Disposition": "attachment; filename=waitlist.csv",
        },
    });
}