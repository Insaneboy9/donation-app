
import express from "express";
import cors from "cors";
import {db, storage} from "./firebaseConfig.js";
import { collection, getDocs } from "firebase/firestore";
import {ref, getDownloadURL} from "firebase/storage";


const app = express()
app.use(express.json())
app.use(cors())

app.listen(8080, () => console.log("Up and Running 8080"))

// app.get("/hawkers", async (req,res) => {
//     const snapshot = await getDocs(collection(db, "hawkers"));
//     const list = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}))
//     res.send(list);
// });

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

app.get("/", async (req,res) => {
    console.log("hi")
    res.send(200);
});