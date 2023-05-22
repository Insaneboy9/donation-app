const { applicationDefault, initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const Web3 = require("web3");
const { abi } = require("./abi");
const { log, error } = require("firebase-functions/logger");
const { createDocument } = require("./functions.js");

const rpcURL = `https://arb-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;
const web3 = new Web3(rpcURL);
const address = process.env.CONTRACT_ADDRESS;
const contract = new web3.eth.Contract(abi, address);
const account = web3.eth.accounts.privateKeyToAccount(
  process.env.OWNER_PRIVATE_KEY ||
    "0x64b96f1a3b48bc3e9cf725f04ccefd93440f0fcf8c823103a6075e5230db9312"
);

// Firebase constants
const app = initializeApp({ credential: applicationDefault() });
const db = getFirestore(app);
const contractOpsRef = db.collection("transactions");

async function updateContract(data, txnId) {
  try {
    const { userId, amount, type } = data;

    // add the transaction to the blockchain
    const transaction = await contract.methods.add([
      txnId,
      userId,
      amount * 100,
      type === "donation",
    ]);

    const gas = await transaction.estimateGas({
      from: account.address,
      to: address,
      data: transaction.encodeABI(),
    });

    const gasPrice = await web3.eth.getGasPrice();
    // multiply by 1.2 to ensure that the transaction is not rejected due to low gas price
    const gasPrice1_2 = Number(gasPrice) * 1.2;

    const signed = await account.signTransaction({
      nonce: await web3.eth.getTransactionCount(account.address, "pending"),
      to: address,
      data: transaction.encodeABI(),
      gas: gas * 2, // ensure that the transaction is not rejected due to insufficient gas
      gasPrice: gasPrice1_2,
    });
    if (signed.rawTransaction == null) return null;

    // send the transaction
    return web3.eth.sendSignedTransaction(signed.rawTransaction);
  } catch (e) {
    error(e.message);
    return null;
  }
}

async function start() {
  try {
    // get the oldest document
    const snapshot = await contractOpsRef
      .where("blockchainTxnId", "==", null)
      .orderBy("timestamp", "asc")
      .limit(1)
      .get();

    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      const docData = doc.data();

      // check if the document is a donation or redemption
      if (docData.type !== "donation" && docData.type !== "redemption") {
        // if not, set the transaction hash to NULL
        await doc.ref.update({ blockchainTxnId: "NULL" });
        log(`Transaction hash: not a donation or redemption`);
      }

      const result = await updateContract(doc.data(), doc.id);
      if (result) {
        // update the document with the transaction hash
        await doc.ref.update({ blockchainTxnId: result.transactionHash });
        log(`Transaction hash: ${result.transactionHash}`);
        return `Transaction hash: ${result.transactionHash}`;
      }
    } else {
      log("No transactions to update");
      return "No transactions to update";
    }
  } catch (e) {
    error(e.message);
    return "An error occurred";
  }
}

module.exports = { start };
