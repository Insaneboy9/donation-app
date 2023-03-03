import { serverTimestamp } from "firebase/firestore";

// Function to add timestamp to data object
export function addTimeBc(data) {
    return {
      ...data,
      timestamp: serverTimestamp(),
      blockchainTxnId: null,
    };
  }
