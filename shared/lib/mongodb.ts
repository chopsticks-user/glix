import {MongoClient} from 'mongodb';
import {attachDatabasePool} from '@vercel/functions';

// setup MongoDB client
const client = new MongoClient(process.env.MONGODB_URI!, {
    appName: "devrel.vercel.integration",
    maxIdleTimeMS: 5000,
});
attachDatabasePool(client);

// setup DB instance
const db = client.db("glix");

const ensureIndexes = async () => {
    const waitlistedCustomers = db.collection('waitlist');
    await waitlistedCustomers.createIndex({email: 1}, {unique: true});
};
ensureIndexes().catch(console.error);

export {db as default, client};