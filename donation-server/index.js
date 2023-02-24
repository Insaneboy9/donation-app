
import express from "express";
import cors from "cors";
import {db, storage} from "./firebaseConfig.js";
import { collection, getDocs } from "firebase/firestore";
import {ref, getDownloadURL} from "firebase/storage";


const app = express()
app.use(express.json())
app.use(cors())

app.listen(8080, () => console.log("Up and Running 8080"))

//Handle GET request for hawkers
app.get("/hawkers", async (req,res) => {
    const snapshot = await getDocs(collection(db, "hawkers"));
    const list = snapshot.docs.map(async (doc) => {
        const data = doc.data();
        const posterUrl = await getDownloadURL(ref(storage, data.poster)); // get poster URL
        const thumbnailUrl = await getDownloadURL(ref(storage, data.thumbnail)); // get thumbnail URL
        return {
          id: doc.id,
          ...data,
          posterUrl,
          thumbnailUrl
        };
      });
      const results = await Promise.all(list); // wait for all the URLs to resolve
      res.send(results);
});

//Handle GET request for organizations
app.get("/organizations", async (req,res) => {
  const snapshot = await getDocs(collection(db, "organizations"));
  const list = snapshot.docs.map(async (doc) => {
      const data = doc.data();
      const posterUrl = await getDownloadURL(ref(storage, data.poster)); // get poster URL
      const thumbnailUrl = await getDownloadURL(ref(storage, data.thumbnail)); // get thumbnail URL
      return {
        id: doc.id,
        ...data,
        posterUrl,
        thumbnailUrl
      };
    });
    const results = await Promise.all(list); // wait for all the URLs to resolve
    res.send(results);
});

//Handle GET request for rewards
app.get("/rewards", async (req,res) => {
  const snapshot = await getDocs(collection(db, "rewards"));
  const list = snapshot.docs.map(async (doc) => {
      const data = doc.data();
      const imagelUrl = await getDownloadURL(ref(storage, data.image)); // get image URL
      return {
        id: doc.id,
        ...data,
        imagelUrl
      };
    });
    const results = await Promise.all(list); // wait for all the URLs to resolve
    res.send(results);
});

// Handle POST request for transactions
app.post('/transactions', (req, res) => {
  // Retrieve data from request body
  const data = req.body;

  // Do something with the data

  // Send response
  res.send('Data received');
});

app.get("/", async (req,res) => {
    console.log("Server is up and running")
    res.send(200);
});