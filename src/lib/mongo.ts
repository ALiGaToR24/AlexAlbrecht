// src/lib/mongo.ts
import { MongoClient, Db } from "mongodb";

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

/**
 * Ленивая инициализация — никаких проверок env на уровне импорта модуля.
 * Ошибка бросается только если getDb реально вызван без MONGODB_URI.
 */
export async function getDb(): Promise<Db> {
  if (!clientPromise) {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      // Ошибку бросаем ТОЛЬКО при реальном вызове, а не во время импорта на билде
      throw new Error("MONGODB_URI is not set");
    }
    client = new MongoClient(uri);
    clientPromise = client.connect();
  }
  const c = await clientPromise;
  const dbName = process.env.MONGODB_DB || undefined;
  return c.db(dbName);
}
