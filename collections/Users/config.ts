import admin from "./access/admin";
import user from "./access/user";

import {CollectionConfig, TypedUser} from "payload";
import protectRoles from "@/collections/Users/hooks/protectRoles";
import {checkRole} from "@/collections/Users/access/checkRole";

const Users: CollectionConfig = {
    slug: "users",
    access: {
        create: admin,
        read: user,
        update: user,
        delete: admin,
    },
    admin: {
        useAsTitle: "email",
        hidden: (args) => !checkRole(
            ["admin"], args.user as TypedUser,
        ),
    },
    defaultPopulate: {
        slug: true,
        name: true,
    },
    auth: {
        tokenExpiration: 7200,
        verify: false, // Quang Cap: turn this on when email verification is available
        maxLoginAttempts: 5,
        lockTime: 600 * 1000,
        loginWithUsername: {
            allowEmailLogin: true,
            requireEmail: false,
        },
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
            hooks: {
                beforeChange: [protectRoles],
            },
            access: {
                update: ({req: {user}}) => checkRole(
                    ["admin"], user as TypedUser
                ),
            },
        },
    ],
};

export default Users;