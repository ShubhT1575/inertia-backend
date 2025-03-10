require("../config/config");
const { web3, contract } = require("./web3");
const Config = require("../models/config");
const allEventsHandler = require("./envetHandlers");

async function getLastSyncBlock() {
  let configObj = await Config.findOne();
  let lastSyncBlock = 0;

  if (!configObj) {
    lastSyncBlock = process.env.LAST_SYNC_BLOCK;
    await Config.create({
      lastSyncBlock: process.env.LAST_SYNC_BLOCK,
    });
  } else {
    lastSyncBlock = configObj.lastSyncBlock;
  }
  return lastSyncBlock;
}

async function getEventReciept(fromBlock, toBlock) {
  let eventsData = await contract.getPastEvents("allEvents", {
    fromBlock: fromBlock,
    toBlock: toBlock,
  });
  return eventsData;
}

async function getTimestamp(blockNumber) {
  let { timestamp } = await web3.eth.getBlock(blockNumber);
  return timestamp;
}

async function processEvents(events) {
  for (let i = 0; i < events.length; i++) {
    const { blockNumber, transactionHash, returnValues, event } = events[i];
    const timestamp = await getTimestamp(blockNumber);
    const params = {
      blockNumber,
      transactionHash,
      returnValues,
      event,
      timestamp,
    };
    console.log(event,transactionHash,blockNumber,events[i], " : EventName");
    const handler = allEventsHandler[event]; // allEventHandler object will direct return event handler function according to event name
    if (handler) await handler(params);
  }
}

async function updateBlock(updatedBlock) {
  try {
    let isUpdated = await Config.updateOne(
      {},
      { $set: { lastSyncBlock: updatedBlock } }
    );
    if (!isUpdated) {
      console.log("Something went wrong!");
    }
  } catch (e) {
    console.log("Error Updating Block", e);
  }
}

async function listEvent() {
  try {
    let lastSyncBlock = await getLastSyncBlock();
    let latestBlock = await web3.eth.getBlockNumber();
    let toBlock =
      latestBlock > lastSyncBlock + 100 ? lastSyncBlock + 100 : latestBlock;
    console.log(lastSyncBlock, toBlock);
    let events = await getEventReciept(lastSyncBlock, toBlock);
    // console.log("events", events.length);

    await processEvents(events);
    await updateBlock(toBlock);
    if (lastSyncBlock == toBlock) {
      setTimeout(listEvent, 15000);
    } else {
      setTimeout(listEvent, 5000);
    }
  } catch (e) {
    console.log(e,'Error in listEvent');
    setTimeout(listEvent, 15000);
  }
}

module.exports = { listEvent };
