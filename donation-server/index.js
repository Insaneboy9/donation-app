const { onRequest } = require("firebase-functions/v2/https");
const cors = require("cors");
const { db, storage } = require("./firebaseConfig");
const { getDownloadURL, ref } = require("firebase/storage");
const { collection, getDocs } = require("firebase/firestore");
const blockchain = require("./controllers/blockchain.js");
const { createDocument } = require("./controllers/functions.js");
const { addTimeBc } = require("./controllers/transactionsconn.js");
const {
  getUserTransactionHistory,
  userOperation,
} = require("./controllers/usersconn.js");
const express = require("express");

const app = express();
app.use(express.json());
app.use(cors());

//Handle GET request for hawkers
app.get("/hawkers", async (req, res) => {
  const snapshot = await getDocs(collection(db, "hawkers"));
  const list = snapshot.docs.map(async (doc) => {
    const data = doc.data();
    const posterUrl = await getDownloadURL(ref(storage, data.poster)); // get poster URL
    const thumbnailUrl = await getDownloadURL(ref(storage, data.thumbnail)); // get thumbnail URL
    return {
      id: doc.id,
      ...data,
      posterUrl,
      thumbnailUrl,
    };
  });
  const results = await Promise.all(list); // wait for all the URLs to resolve
  res.send(results);
});

//Handle GET request for organizations
app.get("/organizations", async (req, res) => {
  const snapshot = await getDocs(collection(db, "organizations"));
  const list = snapshot.docs.map(async (doc) => {
    const data = doc.data();
    const posterUrl = await getDownloadURL(ref(storage, data.poster)); // get poster URL
    const thumbnailUrl = await getDownloadURL(ref(storage, data.thumbnail)); // get thumbnail URL
    return {
      id: doc.id,
      ...data,
      posterUrl,
      thumbnailUrl,
    };
  });
  const results = await Promise.all(list); // wait for all the URLs to resolve
  res.send(results);
});

//Handle GET request for rewards
app.get("/rewards", async (req, res) => {
  const snapshot = await getDocs(collection(db, "rewards"));
  const list = snapshot.docs.map(async (doc) => {
    const data = doc.data();
    const imagelUrl = await getDownloadURL(ref(storage, data.image)); // get image URL
    return {
      id: doc.id,
      ...data,
      imagelUrl,
    };
  });
  const results = await Promise.all(list); // wait for all the URLs to resolve
  res.send(results);
});

// Handle POST request for transactions
app.post("/transactions", async (req, res) => {
  // Retrieve data from request body
  var data = req.body;
  // Add timestamp and blockchain id to data object
  data = addTimeBc(data);
  // Create transaction data in firestore
  await createDocument("transactions", data);
  // Handle user's cash in account
  await userOperation("email", data.email, data.amount, data.type);
  res.send("Data received");
});

//Handle GET request for history
app.get("/history/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    // Get transaction history for user
    const result = await getUserTransactionHistory(userId);
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

//Handle GET request for leaderboard
app.get("/leaderboard", async (req, res) => {
  const snapshot = await getDocs(collection(db, "users"));
  const list = snapshot.docs.map(async (doc) => {
    const data = doc.data();
    return {
      name: data.name,
      points: data.points,
    };
  });
  const results = await Promise.all(list); // wait for all the URLs to resolve
  res.send(results);
});

//Handle GET request for challenge
app.get("/challenge", async (req, res) => {
  const snapshot = await getDocs(collection(db, "challenge"));
  const logoUrl = await getDownloadURL(ref(storage, data.logo)); // get poster URL
  const list = snapshot.docs.map(async (doc) => {
    const data = doc.data();
    return {
      title: data.title,
      logoUrl,
    };
  });
  const results = await Promise.all(list); // wait for all the URLs to resolve
  res.send(results);
});

app.get("/blockchain", async (req, res) => {
  const result = await blockchain.start();
  res.status(200).json({
    message: result,
  });
});

app.get("/", async (req, res) => {
  // send 200 status code with success message as json response
  res.status(200).json({
    success: true,
    message: "Server is up and running",
    serverTime: new Date(),
  });
});

exports.app = onRequest({ timeoutSeconds: 30 }, app);
