import { MongoClient, Db } from "mongodb";

declare global {
  // чтобы не пересоздавать клиент при hot-reload в dev
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const uri = process.env.MONGODB_URI!;
if (!uri) throw new Error("MONGODB_URI is not set");

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise!;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function getDb(): Promise<Db> {
  const c = await clientPromise;
  const dbName = c.options?.dbName || uri.split("/").pop()!.split("?")[0];
  const db = c.db(dbName);

  // индексы создаём один раз «лениво»
  await db.collection("users").createIndex({ email: 1 }, { unique: true });
  return db;
}
