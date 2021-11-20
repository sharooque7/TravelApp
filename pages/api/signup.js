//   /api/new-meetup

import { MongoClient } from "mongodb";
import bcryptjs from "bcryptjs";

async function handler(req, res, next) {
  console.log(req.body);
  const salt = await bcryptjs.genSalt(10);
  const hash = await bcryptjs.hash(req.body.password, salt);
  req.body.password = hash;
  if (req.method === "POST") {
    //  const { title, image, address, description } = data;
    const client = await MongoClient.connect(process.env.MONGO_URL);
    const db = client.db();

    const meetusCollection = db.collection("users");
    meetusCollection.createIndex({ email: 1 }, { unique: true });

    const result = await meetusCollection.insertOne(req.body);

    console.log(result);

    client.close();

    res.status(201).json({ message: "Added Successfully" });
  }
}
export default handler;
