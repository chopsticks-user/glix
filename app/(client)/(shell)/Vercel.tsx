import React from "react";
import {SpeedInsights} from "@vercel/speed-insights/next";
import {Analytics} from "@vercel/analytics/next";

export default function Vercel() {
    return <>
        <SpeedInsights/>
        <Analytics/>
    </>
}