import type {NextConfig} from "next";
import {withPayload} from '@payloadcms/next/withPayload';

const nextConfig: NextConfig = {
    async redirects() {
        return [
            {
                source: "/:prefix(login|logout|signup)",
                destination: "/auth/:prefix",
                permanent: false,
            },
            {
                source: "/admin/:prefix(login|logout)",
                destination: "/auth/:prefix",
                permanent: false,
            },
            {
                source: "/admin/:prefix(forgot|reset)",
                destination: "/auth/:prefix-password",
                permanent: false,
            },
        ];
    },
};

export default withPayload(nextConfig);
