import { MongoClient, Db } from 'mongodb';

let client: MongoClient | null = null;

export const getMongoDb = async (): Promise<Db> => {
    if (!client) {
        client = new MongoClient(process.env.MONGODB_URI!);
        await client.connect();
    }
    return client.db(process.env.MONGODB_DB_NAME);
};
