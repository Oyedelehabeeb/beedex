// import { initializeApp, getApps, App, getApp, cert } from "firebase-admin/app";
// import { getFirestore } from "firebase-admin/firestore";
// import serviceKey from "@/service_key.json";

// // eslint-disable-next-line @typescript-eslint/no-require-imports
// // const serviceKey = require("../service_key.json");

// let app: App;

// if (getApps().length === 0) {
//   app = initializeApp({
//     credential: cert(serviceKey),
//   });
// } else {
//   app = getApp();
// }

// const adminDb = getFirestore(app);

// export { app as adminApp, adminDb };

import { initializeApp, getApps, App, getApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { ServiceAccount } from "firebase-admin";

let app: App;

if (getApps().length === 0) {
  const serviceAccountKey = JSON.parse(
    process.env.FIREBASE_SERVICE_ACCOUNT_KEY || "{}"
  ) as ServiceAccount;

  app = initializeApp({
    credential: cert(serviceAccountKey),
  });
} else {
  app = getApp();
}

const adminDb = getFirestore(app);

export { app as adminApp, adminDb };
