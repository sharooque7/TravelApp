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
    // console.log(NextApiRequest["headers"].authorization);
  };

export default authenticated(async function deletehanlder(req, res) {
  const id = req.body.id;
  // console.log(req.body.id);
  // console.log(id);
  if (req.method === "DELETE") {
    try {
      const client = await MongoClient.connect(process.env.MONGO_URL);
      const db = client.db();

      const meetusCollection = db.collection("meetup");

      const result = await meetusCollection.deleteOne({ _id: ObjectId(id) });

      // console.log(result);

      res.status(201).json({ Message: "Deleted successfully" });
    } catch (error) {
      //  console.log(error);
      res.status(500).json({ Message: "Item not found" });
    }
  }
});
