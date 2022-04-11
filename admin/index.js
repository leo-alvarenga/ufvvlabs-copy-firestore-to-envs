const admin = require("firebase-admin");

const prodConfig = require("./keys/boto-d5ec1-firebase-adminsdk-jl1go-1d3d48213c.json");
const devConfig = require("./keys/virtuallabs-dev-firebase-adminsdk-out6v-f156c7df3a.json");
const testConfig = require("./keys/virtuallabs-test-firebase-adminsdk-25v4d-063fd51035.json");

const prod = admin.initializeApp({
    credential: admin.credential.cert(prodConfig)
}, "prod");

const dev = admin.initializeApp({
    credential: admin.credential.cert(devConfig)
}, "dev");

const test = admin.initializeApp({
    credential: admin.credential.cert(testConfig)
}, "test");

const dbProd = admin.firestore(prod);
const dbDev = admin.firestore(dev);
const dbTest = admin.firestore(test);

module.exports = {
    prod, dbProd,
    dev, dbDev,
    test, dbTest
};