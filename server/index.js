require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dz5chaq.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// mongodb connection
const dbConnect = async () => {
  try {
    client.connect();
    console.log("DB Connected Successfully✅");
  } catch (error) {
    console.log(error.name, error.message);
  }
};
dbConnect();

const database = client.db("SEOPage1DB");
const filesCollections = database.collection("filesDB");

app.get("/", (req, res) => {
  res.send("server is running data will be appear soon...");
});

app.get("/files", async(req, res) => {
  const result = await filesCollections.find().toArray()
  res.json(result)
})

app.post("/files", async (req, res) => {
  try {
    const imgURL = req.body;
    const result = await filesCollections.insertOne(imgURL);
    res.json(result);
  } catch (error) {
    console.log("Error", error.message);
  }
});

app.delete("/files", async (req, res) => {
  const imgURL = req.body;
  const result = await filesCollections.deleteMany({})
  res.json(result)
})

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
