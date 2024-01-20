const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require("mongodb");

const client = new MongoClient(process.env.MONOGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectDb() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch {
    console.dir;
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
module.exports = connectDb;
