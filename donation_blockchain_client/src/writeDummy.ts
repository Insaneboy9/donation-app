/* Write dummy data to pendingContractOperations collection */
import { applicationDefault, initializeApp } from 'firebase-admin/app'
import { FieldValue, getFirestore } from 'firebase-admin/firestore'

// Firebase constants
const app = initializeApp({ credential: applicationDefault() })
const db = getFirestore(app)

Promise.resolve().then(async () => {
  const batch = db.batch()
  const blockchainRef = db.collection('pendingContractOperations')
  // create vouchers
  batch.set(blockchainRef.doc(), {
    voucherId: 'a',
    hawkerName: '',
    amountInCents: 5000,
    timestamp: FieldValue.serverTimestamp(),
  })
  batch.set(blockchainRef.doc(), {
    voucherId: 'b',
    hawkerName: '',
    amountInCents: 2500,
    timestamp: FieldValue.serverTimestamp(),
  })
  batch.set(blockchainRef.doc(), {
    voucherId: 'c',
    hawkerName: '',
    amountInCents: 2500,
    timestamp: FieldValue.serverTimestamp(),
  })

  // use voucher
  batch.set(blockchainRef.doc(), {
    voucherId: 'a',
    timestamp: FieldValue.serverTimestamp(),
  })
  try {
    await batch.commit()
  } catch (error) {
    console.error((error as any).message)
  }
})

process.on('SIGINT', async () => {
  console.log('SIGINT signal received: Exiting gracefully')
  return process.exit()
})
