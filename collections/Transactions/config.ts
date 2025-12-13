import {checkRole, isAdmin} from "@/collections/common";

import {CollectionConfig} from "payload";

const Transactions: CollectionConfig = {
    slug: "transactions",
    access: {
        read: ({req: {user}}) =>
            checkRole(["admin"], user) || Boolean({
                or: [
                    {source: {equals: user?.id}},
                    {destination: {equals: user?.id}},
                ],
            }),
        create: ({req: {user}}) => !!user,
        update: () => false,
        delete: isAdmin,
    },
    admin: {
        useAsTitle: "sender",
    },
    fields: [
        {
            name: "sender",
            type: "relationship",
            relationTo: "users",
            required: true,
            admin: {
                condition: () => false,
            },
            defaultValue: ({req: {user}}) => {
                return user?.id;
            },
        },
        {
            name: "from",
            type: "relationship",
            relationTo: "accounts",
            required: true,
            defaultValue: ({req: {user}}) => {
                return user?.preferredAccount;
            },
        },
        {
            name: "receiver",
            type: "relationship",
            relationTo: "users",
            required: true,
            hooks: {
                beforeChange: [
                    ({req: {user}, value, operation}) => {
                        if (operation === "create") {
                            if (value === user?.id) {
                                // todo: should allow this later if sending account
                                // and receiving account are different
                                throw new Error("You cannot send money to yourself");
                            }
                        }
                    },
                ],
            },
        },
        {
            name: "to",
            type: "relationship",
            relationTo: "accounts",
            admin: {
                condition: () => false,
            },
        },
        {
            name: "amount",
            type: "number",
        },
        {
            name: "status",
            type: "radio",
            options: [
                {label: "Requested", value: "requested"},
                {label: "Pending", value: "pending"},
                {label: "Rejected", value: "rejected"},
                {label: "Accepted", value: "accepted"},
            ],
            defaultValue: "requested",
            admin: {
                condition: () => false,
            },
        },
    ],
    hooks: {
        afterChange: [],
    },
};

export default Transactions;