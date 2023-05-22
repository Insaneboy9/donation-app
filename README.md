# Donation Application

Team Project Coded with React Native

## Navigating Directory

Screens are found in /donation-app
Backend APIs are found in /donation-server
Basic Program Commands

## Client

cd donation-app

### Install Dependencies

npm install

### Build & compile program

npm run build

### Running on Android Emulator

npm run android

## Server

cd donation-server

### Installation

1. Node.js

2. Firebase Tools - `npm install -g firebase-tools`

Run `firebase login`

Run `firebase use donation-app-8de49`

### Start Server locally

cd to `donation-server` directory 

Install packages

```bash
npm install
```

Download `.env` and `firebase-service-account.json` files from Google Drive and place them at the `donation-server` root directory.

Start server

```bash
npm run serve
```

### Deploy Server

Delete `package-lock.json` file in `donation-server` directory.

Run `firebase deploy --only functions` on the root directory of the repo folder.
