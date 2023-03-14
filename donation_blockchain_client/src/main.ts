import * as dotenv from 'dotenv'
import { applicationDefault, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import Web3 from 'web3'
import { abi } from './abi'

// load environment variables
dotenv.config()

// Blockchain constants
const rpcURL = `https://arb-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
const web3 = new Web3(rpcURL)
const address = process.env.CONTRACT_ADDRESS
const contract = new web3.eth.Contract(abi, address)
const account = web3.eth.accounts.privateKeyToAccount(
  process.env.OWNER_PRIVATE_KEY as string
)
const baseBlockFee = 106320000

// Firebase constants
const app = initializeApp({ credential: applicationDefault() })
const db = getFirestore(app)
const contractOpsRef = db.collection('transactions')

async function updateContract(data: any, txnId: string) {
  try {
    const { userId, amount, type } = data

    // add the transaction to the blockchain
    const transaction = await contract.methods.add([
      txnId,
      userId,
      amount * 100,
      type === 'donation',
    ])
    const gas = await transaction.estimateGas({ from: account.address })
    const signed = await account.signTransaction({
      nonce: await web3.eth.getTransactionCount(account.address, 'pending'),
      to: address,
      data: transaction.encodeABI(),
      gas: gas > baseBlockFee ? gas : baseBlockFee,
      gasPrice: await web3.eth.getGasPrice(),
    })
    if (signed.rawTransaction == null) return null

    // send the transaction
    return web3.eth.sendSignedTransaction(signed.rawTransaction)
  } catch (error) {
    console.error((error as any).message)
    return null
  }
}

Promise.resolve().then(async () => {
  while (true) {
    try {
      // get the oldest document
      const snapshot = await contractOpsRef
        .where('blockchainTxnId', '==', null)
        .orderBy('timestamp', 'asc')
        .limit(1)
        .get()

      if (!snapshot.empty) {
        const doc = snapshot.docs[0]
        const docData = doc.data()

        // check if the document is a donation or redemption
        if (docData.type !== 'donation' && docData.type !== 'redemption') {

          // if not, set the transaction hash to NULL
          await doc.ref.update({ blockchainTxnId: 'NULL' })
          console.log(`Transaction hash: not a donation or redemption`)
          continue
        }

        const result = await updateContract(doc.data(), doc.id)
        if (result) {
          // update the document with the transaction hash
          await doc.ref.update({ blockchainTxnId: result.transactionHash })
          console.log(`Transaction hash: ${result.transactionHash}`)
        }
      }
    } catch (error) {
      console.error((error as any).message)
    } finally {
      await sleep()
    }
  }
})

function sleep(ms: number = 100) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

process.on('SIGINT', async () => {
  console.log('SIGINT signal received: Exiting gracefully')
  return process.exit()
})
