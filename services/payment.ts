import {Transaction} from "@/payload-types";
import {CollectionSlug, getPayload, type Payload} from "payload";
import config from "@payload-config";

async function getInstance<T>(
    maybeInstance: T | string, collection: CollectionSlug, payload: Payload
): Promise<T> {
    return typeof maybeInstance === "string"
        ? (await payload.findByID({
            collection: collection,
            id: maybeInstance
        })) as T
        : maybeInstance;
}

export async function initiateTransaction(transaction: Transaction) {
    const payload: Payload = await getPayload({config});


    const from = await getInstance(
        transaction.from, "accounts", payload
    );

    const receiver = await getInstance(
        transaction.receiver, "users", payload
    );

    const receiverAccounts = (await payload.find({
        collection: "accounts",
        where: {
            owner: {equals: receiver.id},
        },
    })).docs;

    if (from.balance! < transaction.amount! || receiverAccounts.length === 0) {
        console.log(transaction);
        await payload.update({
            collection: "transactions",
            id: transaction.id,
            data: {
                status: "rejected",
            }
        });
        return Response.json({error: 'Transaction rejected'}, {status: 400});
    }

    if (receiver.preferredAccount) {
        transaction.to = receiver.preferredAccount;
    } else {
        transaction.to = receiverAccounts![0];
    }

    const adminAccount = (await payload.find({
        collection: "accounts",
        where: {
            owner: {
                equals: (await payload.find({
                    collection: "users",
                    where: {
                        email: {equals: "admin@glix.com"},
                    },
                })).docs[0].id
            },
        },
    })).docs[0];


    await payload.update({
        collection: "accounts",
        id: adminAccount.id,
        data: {
            balance: adminAccount.balance! + transaction.amount!,
        },
    });

    await payload.update({
        collection: "accounts",
        id: from.id,
        data: {
            balance: from.balance! - transaction.amount!,
        },
    });

    return Response.json({}, {status: 200});
}

export async function completeTransaction(transaction: Transaction) {
    const payload: Payload = await getPayload({config});

    // Resolve "to" account
    const to = await getInstance(transaction.to, "accounts", payload);
    if (!to) {
        throw new Error("Target account not found");
    }

    // Fetch admin user
    const adminUserQuery = await payload.find({
        collection: "users",
        where: {email: {equals: "admin@glix.com"}},
    });

    const adminUser = adminUserQuery.docs[0];
    if (!adminUser) {
        throw new Error("Admin user not found");
    }

    // Fetch admin account
    const adminAccountQuery = await payload.find({
        collection: "accounts",
        where: {owner: {equals: adminUser.id}},
    });

    const adminAccount = adminAccountQuery.docs[0];
    if (!adminAccount) {
        throw new Error("Admin account not found");
    }

    // Transfer out of admin
    await payload.update({
        collection: "accounts",
        id: adminAccount.id,
        data: {
            balance: adminAccount.balance! - transaction.amount!,
        },
    });

    console.log("here");

    // Transfer into final recipient
    await payload.update({
        collection: "accounts",
        id: to.id,
        data: {
            balance: to.balance! + transaction.amount!,
        },
    });

    return Response.json({}, {status: 200});
}