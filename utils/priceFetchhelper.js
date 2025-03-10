const fetch = require("node-fetch");
const crypto = require("crypto");

async function fetchBNBPrice() {
  try {
    let response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd"
    ).then((d) => d.json());
    return response.binancecoin.usd;
  } catch (e) {
    console.log("Error in fetchBNBPrice", e);
  }
}

async function fetchARBPrice() {
  try {
    let response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=arbitrum&vs_currencies=usd"
    ).then((d) => d.json());
    return response.arbitrum.usd;
  } catch (e) {
    console.log("Error in fetchARBPrice ", e);
  }
}

async function fetchWYSPrice() {
  try {
    let response = await fetch(
      "https://sapi.xt.com/v4/public/ticker/price"
    ).then((d) => d.json());
    let wys = response.result.find((d) => d.s === "wys_usdt");
    return wys.p;
  } catch (e) {
    console.log("Error in fetchARBPrice ", e);
  }
}

function generateHash({ txHash, user, timestamp, rewardAmount, block }) {
  return crypto
    .createHash("sha256")
    .update(`${txHash}-${user}-${timestamp}-${rewardAmount}-${block}`)
    .digest("hex");
}

module.exports = {
  fetchBNBPrice,
  fetchARBPrice,
  fetchWYSPrice,
  generateHash,
};
