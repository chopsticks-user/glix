import Users from "./collections/Users/config";
import Media from "./collections/Media";

import sharp from "sharp";
import {lexicalEditor} from "@payloadcms/richtext-lexical";
import {mongooseAdapter} from "@payloadcms/db-mongodb";
import {buildConfig} from "payload";
import path from "path";
import {fileURLToPath} from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
    admin: {
        user: Users.slug,
        importMap: {
            baseDir: path.resolve(dirname),
        },
        routes: {
            account: "/me",
        },
    },

    routes: {
        admin: "/dashboard",
    },

    // If you'd like to use Rich Text, pass your editor here
    editor: lexicalEditor(),

    // Define and configure your collections in this array
    collections: [
        Users, Media,
    ],

    // Your Payload secret - should be a complex and secure string, unguessable
    secret: process.env.PAYLOAD_SECRET || "",

    // Whichever Database Adapter you're using should go here
    // Mongoose is shown as an example, but you can also use Postgres
    db: mongooseAdapter({
        url: process.env.MONGODB_URI || "",
    }),

    typescript: {
        outputFile: path.resolve(dirname, "payload-types.ts"),
    },

    // If you want to resize images, crop, set focal point, etc.
    // make sure to install it and pass it to the config.
    // This is optional - if you don't need to do these things,
    // you don't need it!
    sharp,
});