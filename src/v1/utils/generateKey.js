const crypto = require("crypto");

const generateKey = () => {
  return {
    privateKey: crypto.randomBytes(64).toString("hex"),
    publicKey: crypto.randomBytes(64).toString("hex"),
  };
};
module.exports = generateKey;
