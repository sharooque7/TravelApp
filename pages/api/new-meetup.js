//   /api/new-meetup

import { MongoClient } from "mongodb";
import jwt from "jsonwebtoken";

export const authenticated =
  (NextApiHandler) => async (NextApiRequest, NextApiResponse) => {
    const token = NextApiRequest["headers"].authorization.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, async function (error, decoded) {
      console.log(token);
      if (!error && decoded) {
        console.log("veryfied");
        return await NextApiHandler(NextApiRequest, NextApiResponse);
      }
      console.log("Hi");
      NextApiResponse.status(401).json({
        message: "Sorry you are not authenticated",
      });
    });
    // console.log(NextApiRequest["headers"].authorization);
  };

export default authenticated(async function handler(req, res, next) {
  if (req.method === "POST") {
    const { body: data } = req.body;
    //  console.log(req);
    console.log(data + "Hi");
    //  const { title, image, address, description } = data;
    const client = await MongoClient.connect(process.env.MONGO_URL);
    const db = client.db();

    const meetusCollection = db.collection("meetup");

    const result = await meetusCollection.insertOne(req.body);

    console.log(result);

    client.close();

    res.status(201).json({ message: "Added Successfully" });
  }
});
