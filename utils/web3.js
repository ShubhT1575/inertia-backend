require("../config/config");
const Web3 = require("web3");
const ABI = require("../abis/oxfarmabi.json");
const ethers = require("ethereumjs-util");

const web3 = new Web3(
  new Web3.providers.HttpProvider(process.env.RPC_URL, {
    reconnect: {
      auto: true,
      delay: 5000, // ms
      maxAttempts: 15,
      onTimeout: false,
    },
  })
);
const contract = new web3.eth.Contract(ABI, process.env.GOVERN_CONTRACT);

function isValidEthereumAddress(address) {
  return ethers.isValidAddress(address);
}

function checksumAddress(address) {
  const checksumAddress = web3.utils.toChecksumAddress(address);
  return checksumAddress;
}

async function recoverSignMessage(signature, message) {
  try {
    function stringToHex(str) {
      let hex = "";
      for (let i = 0; i < str.length; i++) {
        hex += str.charCodeAt(i).toString(16).padStart(2, "0");
      }
      return "0x" + hex;
    }
    const util = require("ethereumjs-util");
    const sig = util.fromRpcSig(signature);
    const hs = stringToHex(message);
    const msg = util.toBuffer(hs);
    const publicKey = util.ecrecover(util.keccak256(msg), sig.v, sig.r, sig.s);
    const address = util.pubToAddress(publicKey).toString("hex");
    // console.log("0x" + address, "recovered address");
    return address ? address : null;
  } catch (e) {
    console.log(e, "Error in recover sign message");
    return null;
  }
}

async function getTimestamp(blockNumber) {
  let { timestamp } = await web3.eth.getBlock(blockNumber);
  return timestamp;
}

module.exports = {
  web3,
  contract,
  getTimestamp,
  isValidEthereumAddress,
  checksumAddress,
  recoverSignMessage
};
