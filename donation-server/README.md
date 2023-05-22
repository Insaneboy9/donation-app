# Donation Server

Node.js Firebase Function API server for our donation mobile application.

## Set up

### Installation

1. Node.js

2. Firebase Tools - `npm install -g firebase-tools`

Run `firebase login`

Run `firebase use donation-app-8de49` or your Firebase project

### Start Server locally

At `donation-server` directory

Install packages

```bash
npm install
```

Download `.env` and `firebase-service-account.json` files from Google Drive and place them in the current directory.

.env file example

```txt
ALCHEMY_API_KEY=VALUE
OWNER_PRIVATE_KEY=VALUE
CONTRACT_ADDRESS=VALUE
```

Start server

```bash
npm run serve
```

### Deploy Server

Delete `package-lock.json` file in the `donation-server` directory.

Run `firebase deploy --only functions` on the root directory of the repo folder.
