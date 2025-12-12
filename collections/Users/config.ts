import {checkRole, useProtectRoles} from "@/collections/common";
import "@/collections/common/seed";

import {CollectionConfig} from "payload";

const Users: CollectionConfig = {
    slug: "users",
    access: {
        create: ({req: {user}}) =>
            checkRole(["admin"], user),

        read: ({req: {user}}) =>
            checkRole(["admin"], user) || {
                or: [
                    {id: {in: user?.contacts}},
                    {id: {equals: user?.id}},
                ]
            },

        update: ({req: {user}}) => {
            return checkRole(["admin"], user) || {
                id: {equals: user?.id},
            };
        },

        delete: ({req: {user}}) =>
            checkRole(["admin"], user),
    },
    admin: {
        useAsTitle: "email",
    },
    defaultPopulate: {
        slug: true,
        name: true,
    },
    auth: {
        tokenExpiration: 7200,
        verify: false, // turn this on when email verification is available
        maxLoginAttempts: 5,
        lockTime: 600 * 1000,
        loginWithUsername: false,
        // loginWithUsername: {
        //     allowEmailLogin: true,
        //     requireEmail: false,
        // },
    },
    fields: [
        {
            name: "avatar",
            type: "upload",
            relationTo: "media",
        },
        {
            name: "roles",
            type: "select",
            hasMany: true,
            saveToJWT: true,
            options: [
                {label: "Admin", value: "admin"},
                {label: "User", value: "user"},
            ],
            required: true,
            defaultValue: {
                label: "User",
                value: "user"
            },
            hooks: {
                beforeChange: [useProtectRoles],
            },
            access: {
                read: ({req: {user}}) =>
                    checkRole(["admin"], user),
                update: ({req: {user}}) =>
                    checkRole(["admin"], user),
            },
        },
        {
            name: "contacts",
            type: "relationship",
            relationTo: "users",
            saveToJWT: true,
            hasMany: true,
            access: {
                read: ({req: {user}}) =>
                    checkRole(["admin"], user),
            },
        },
        {
            name: "accounts",
            type: "relationship",
            relationTo: "accounts",
            hasMany: true,
            access: {
                read: ({req: {user}}) =>
                    checkRole(["admin"], user),
            },
            maxDepth: 2,
        },
        {
            name: "transactions",
            type: "relationship",
            relationTo: "transactions",
            hasMany: true,
            access: {
                read: ({req: {user}}) =>
                    checkRole(["admin"], user),
            },
            // hooks: {
            //     beforeChange: [protectRoles],
            // },
            // access: {
            //     // update: ({req: {user}}) => checkRole(
            //     //     ["admin"], user as TypedUser
            //     // ),
            // },
        },
        {
            name: "preferredAccount",
            type: "relationship",
            relationTo: "accounts",
            access: {
                create: ({req: {user}, id}) =>
                    checkRole(["user"], user),
                read: ({req: {user}}) =>
                    checkRole(["user"], user),
                update: ({req: {user}}) =>
                    checkRole(["user"], user),
            }
        },
    ],
};

export default Users;