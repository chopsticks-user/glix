import React from 'react';

export default function Home(props: LayoutProps<"/">) {
    return <>
        {/**
         * todo: the below components except for {props.hero} needs to be refactored
         * by isolating their
         * client-rendered sub components into separated client component files
         * and remove "use client" directives at the top of each root component
         * file. More detailed reasoning and explanation can be found in
         * ./(hero)/Hero.tsx or the Next.js docs
         *
         * @author Quang Cap
         */}
        {props.hero}
        {props.socialProof}
        {props.problemSolution}
        {props.comparisonSection}
        {props.globalScale}
        {props.businessTypes}
        {props.trustLayer}
        {props.marketTicker}
        {props.ecosystem}
        {props.solutions}
        {props.howItWorks}
        {props.whyChooseUs}
        {props.features}
        {props.revenueCalculator}
        {props.trustSignals}
    </>
}
