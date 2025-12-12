import {checkRole, isAdminOrSelf} from "@/collections/common";

import {CollectionConfig} from "payload";

const Accounts: CollectionConfig = {
    slug: "accounts",
    access: {
        create: isAdminOrSelf,
        read: isAdminOrSelf,
        update: isAdminOrSelf,
        delete: isAdminOrSelf,
    },
    admin: {
        useAsTitle: "provider",
    },
    fields: [
        {
            name: "owner",
            type: "relationship",
            relationTo: "users",
            required: true,
            admin: {
                condition: () => false,
            },
            defaultValue: ({req: {user}}) => {
                return user?.id;
            },
            access: {
                read: ({req: {user}}) =>
                    checkRole(["admin"], user),
            },
        },
        {
            // todo: make sure same-provider accounts cannot exists within a user id
            name: "provider",
            type: "select",
            hasMany: true,
            options: [
                {label: "Stripe", value: "stripe"},
                {label: "Paypal", value: "paypal"},
            ],
            required: true,
            access: {},
        },
        {
            name: "balance",
            type: "number",
            required: true,
            admin: {
                condition: () => false,
            },
            access: {},
            hooks: {
                // todo: for testings only
                beforeValidate: [
                    ({req: {}, value, operation}) => {
                        if (operation === "create") {
                            // value = Math.floor(Math.random() * 10001);
                            value = 1000;
                        }
                        return value;
                    }
                ],
            },
        },
    ],
};

export default Accounts;