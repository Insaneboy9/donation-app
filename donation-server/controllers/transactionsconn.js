const { serverTimestamp } = require("firebase/firestore");

// Function to add timestamp to data object
function addTimeBc(data) {
  return {
    ...data,
    timestamp: serverTimestamp(),
    blockchainTxnId: null,
  };
}

module.exports = { addTimeBc };
