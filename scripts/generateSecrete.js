const crypto = require("crypto");
const secret = crypto.randomBytes(64).toString("hex");
console.log(`STORE THIS AND DO NOT SHARE IT\n${secret}`);
