//   /api/new-meetup

import { MongoClient, ObjectId } from "mongodb";
import jwt from "jsonwebtoken";

export const authenticated =
  (NextApiHandler) => async (NextApiRequest, NextApiResponse) => {
    const token = NextApiRequest["headers"].authorization.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, async function (error, decoded) {
      if (!error && decoded) {
        console.log("verifyi");
        return await NextApiHandler(NextApiRequest, NextApiResponse);
      }
      NextApiResponse.status(401).json({
        message: "Sorry you are not authenticated",
      });
    });
    console.log(NextApiRequest["headers"].authorization);
  };

export default authenticated(async function handler(req, res, next) {
  if (req.method === "POST") {
    const id = req.body.id;
    //   console.log(id);

    try {
      const conn = await MongoClient.connect(process.env.MONGO_URL);
      const db = await conn.db();

      const meetupColection = await db.collection("meetup");
      const meetupItem = await meetupColection.findOne({ _id: ObjectId(id) });

      // console.log(meetupItem);
      conn.close();
      return res.status(201).json({ meetupItem });
    } catch (error) {
      //console.log(error);
    }
  }
  if (req.method === "PUT") {
    const { id, title, image, address, description } = req.body;
    /////console.log(id);

    //  const { title, image, address, description } = data;
    const client = await MongoClient.connect(process.env.MONGO_URL);
    const db = client.db();

    const meetusCollection = db.collection("meetup");

    const result = await meetusCollection.findOneAndUpdate(
      {
        _id: ObjectId(id),
      },
      {
        $set: {
          title: title,
          image: image,
          address: address,
          description: description,
        },
      }
    );

    // //console.log(result);

    client.close();

    res.status(201).json({ message: "Added Successfully" });
  }
});
