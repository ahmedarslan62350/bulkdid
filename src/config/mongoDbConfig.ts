import { MongoClient } from "mongodb";
import { ENV } from "./env";

const uri = ENV.MONGODB_URI;

if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable.");
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export default clientPromise;
