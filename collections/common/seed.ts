import {type Payload} from "payload";

export default async function seed(payload: Payload) {
    const findIdByEmail = async (email: string) => {
        return (await payload.find({
            collection: "users",
            where: {
                email: {equals: email},
            },
        })).docs.map(u => u.id)[0];
    };

    let alphaId = await findIdByEmail("alpha@email.com");
    if (!alphaId) {
        const created = await payload.create({
            collection: "users",
            data: {
                email: "alpha@email.com",
                password: "test123",
                roles: ["user"],
            },
        });
        alphaId = created.id;
    }

    let betaId = await findIdByEmail("beta@email.com");
    if (!betaId) {
        const created = await payload.create({
            collection: "users",
            data: {
                email: "beta@email.com",
                password: "test123",
                roles: ["user"],
            },
        });
        betaId = created.id;
    }

    let gammaId = await findIdByEmail("gamma@email.com");
    if (!gammaId) {
        const created = await payload.create({
            collection: "users",
            data: {
                email: "gamma@email.com",
                password: "test123",
                roles: ["user"],
            },
        });
        gammaId = created.id;
    }

    const alphaUser = await payload.findByID({collection: "users", id: alphaId});
    let alphaContacts = alphaUser.contacts || [];
    if (!alphaContacts.includes(betaId)) alphaContacts.push(betaId);
    if (!alphaContacts.includes(gammaId)) alphaContacts.push(gammaId);
    await payload.update({
        collection: "users",
        id: alphaId,
        data: {contacts: alphaContacts},
    });

    const betaUser = await payload.findByID({collection: "users", id: betaId});
    let betaContacts = betaUser.contacts || [];
    if (!betaContacts.includes(alphaId)) betaContacts.push(alphaId);
    await payload.update({
        collection: "users",
        id: betaId,
        data: {contacts: betaContacts},
    });

    const gammaUser = await payload.findByID({collection: "users", id: gammaId});
    let gammaContacts = gammaUser.contacts || [];
    if (!gammaContacts.includes(alphaId)) gammaContacts.push(alphaId);
    await payload.update({
        collection: "users",
        id: gammaId,
        data: {contacts: gammaContacts},
    });
}

