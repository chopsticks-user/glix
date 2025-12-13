import env from "@/shared/lib/env";
import Users from "./collections/Users/config";
import Media from "./collections/Media/config";
import Accounts from "./collections/Accounts/config";
import Transactions from "./collections/Transactions/config";

import sharp from "sharp";
import {lexicalEditor} from "@payloadcms/richtext-lexical";
import {mongooseAdapter} from "@payloadcms/db-mongodb";
import {buildConfig} from "payload";
import path from "path";
import {fileURLToPath} from "url";
import seed from "@/collections/common/seed";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
    serverURL: env.url.server,

    admin: {
        user: Users.slug,
        importMap: {
            baseDir: path.resolve(dirname),
        },
        routes: {
            account: "/account",
        },
    },

    routes: {
        admin: "/admin",
        api: "/api",
        graphQL: "/graphql",
        graphQLPlayground: "/graphql-playground",
    },

    // If you'd like to use Rich Text, pass your editor here
    editor: lexicalEditor(),

    // Define and configure your collections in this array
    collections: [
        Users, Media, Accounts, Transactions,
    ],

    // Your Payload secret - should be a complex and secure string, unguessable
    secret: process.env.PAYLOAD_SECRET || "",

    // Whichever Database Adapter you're using should go here
    // Mongoose is shown as an example, but you can also use Postgres
    db: mongooseAdapter({
        url: process.env.MONGODB_GLIX_URI || "",
    }),

    typescript: {
        outputFile: path.resolve(dirname, "payload-types.ts"),
    },

    // If you want to resize images, crop, set focal point, etc.
    // make sure to install it and pass it to the config.
    // This is optional - if you don't need to do these things,
    // you don't need it!
    sharp,

    onInit: async (payload) => {
        // If the `env` var `PAYLOAD_SEED` is set, seed the db
        if (process.env.PAYLOAD_SEED) {
            await seed(payload);
        }
    }
});