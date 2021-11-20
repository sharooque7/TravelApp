//   /api/new-meetup

import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

async function handler(req, res, next) {
  console.log(req.body);
  const { email, password } = req.body;
  console.log(email, password);
  const MONGO_URL = process.env.MONGO_URL;
  console.log(MONGO_URL);

  if (req.method === "POST") {
    const client = await MongoClient.connect(MONGO_URL);
    const db = client.db();

    const meetusCollection = db.collection("users");

    const result = await meetusCollection.findOne({
      email: email,
    });
    client.close();

    const validPassword = await bcrypt.compare(password, result.password);

    !validPassword && res.status(400).json({ message: "wrong password" });

    const token = jwt.sign({ id: result._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("Valid" + result._id);

    res.status(201).json({ message: "users  found", token });
  }
}
export default handler;
