import {checkRole} from "@/collections/common";

import {CollectionConfig, TypedUser} from "payload";

const Media: CollectionConfig = {
    slug: "media",
    access: {
        create: () => true,
        read: () => true,
        update: () => true,
        delete: () => true,
    },
    admin: {
        hidden: (args) => !checkRole(
            ["admin"], args.user as TypedUser,
        ),
    },
    fields: [
        {
            name: "alt",
            type: "text",
            required: true,
        },
    ],
    upload: {},
};

export default Media;