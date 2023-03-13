import {
  collection,
  query,
  where,
  getDoc,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebaseConfig.js";

// Update documents based on a field value
export const userOperation = async (fieldName, fieldValue, value, type) => {
  const collectionRef = collection(db, "users");
  const q = query(collectionRef, where(fieldName, "==", fieldValue));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(async (document) => {
    const docRef = doc(db, "users", document.id);
    try {
      const doc = await getDoc(docRef);
      const currentCashValue = doc.data()["cash"];
      const currentPointValue = doc.data()["points"];
      if (type == "donation") {
        await updateDoc(docRef, {
          ["cash"]: Number(currentCashValue) - Number(value),
          ["points"]: Number(currentPointValue) + (0.1 * Number(value)),
        });
      } else if (type == "redemption" || type == "withdraw") {
        await updateDoc(docRef, {
          ["cash"]: Number(currentCashValue) - Number(value),
        });
      } else if (type == "rewards") {
        await updateDoc(docRef, {
          ["points"]: Number(currentPointValue) - Number(value),
        });
      } else if (type == "deposit") {
        await updateDoc(docRef, {
          ["cash"]: Number(currentCashValue) + Number(value),
        });
      }
      console.log(
        `Document with ${fieldName}=${fieldValue} successfully updated!`
      );
    } catch (e) {
      console.error(
        `Error updating document with ${fieldName}=${fieldValue}: `,
        e
      );
    }
  });
};

export const getUserTransactionHistory = async (userId) => {
  try {
    const collectionRef = collection(db, "transactions");
    const q = query(collectionRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    // Extract document data from QuerySnapshot
    const userTransactions = querySnapshot.docs.map((doc) => doc.data());

    //Sort the filtered transactions by timestamp in descending order
    userTransactions.sort((a, b) => b.timestamp - a.timestamp);
    console.log(userTransactions);
    //Group the sorted transactions by date (ignoring the time component)
    const groupedTransactions = {};
    userTransactions.forEach((transaction) => {
      const date = new Date(transaction.timestamp.toDate())
        .toISOString()
        .substring(0, 10);
      if (!groupedTransactions[date]) {
        groupedTransactions[date] = [];
      }
      groupedTransactions[date].push(transaction);
    });

    //Create an array of objects representing the transaction history for each date
    const transactionHistory = Object.entries(groupedTransactions).map(
      ([date, transactions]) => {
        // Map the grouped transactions to an array of objects in the desired format
        // const history = transactions.map((transaction) => ({
        //   to:
        //     transaction.type === "donation"
        //       ? transaction.email
        //       : "Chicken Rice", // We dont have a stall name in transaction history
        //   amount: parseFloat(transaction.amount),
        // }));
        const history = transactions.map((transaction) => {
          let to;
          switch (transaction.type) {
            case "donation":
              to = "Donation to UNICEF";
              break;
            case "withdraw":
              to = "Bank Transfer";
              break;
            case "deposit":
              to = "Top-up to wallet";
              break;
            default:
              to = "Chicken Rice";
              break;
          }
          return {
            to: to,
            amount: parseFloat(transaction.amount),
          };
        });
        return {
          date: new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          history,
        };
      }
    );

    return transactionHistory;
  } catch (error) {
    console.error(error);
    return { success: false, error: "Internal Server Error" };
  }
};
