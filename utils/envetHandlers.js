const stakes = require("../models/stakes");
const proposals = require("../models/proposals");
const vote = require("../models/vote");
const divident = require("../models/divident");
const blackListed = require("../models/blackListed");
const unstakes = require("../models/unstakes");
const ExpireTime = require("../models/ExpireTime");
const ProposalExecuted = require("../models/ProposalExecuted");
const ProposalExecutedReward = require("../models/ProposalExecutedReward");

//All contract events handler Object
const allEventsHandler = {
  Staked: StakeEventData,
  ProposalCreated: ProposalCreatedData,
  Vote: voteData,
  DividentsClaimed: DividentsClaimedData,
  BlackListed: BlackListedData,
  Unstaked: UnstakedData,
  ExpireTimeChanged: ExpireTimeChangedData,
  ProposalExecuted: ProposalExecutedData,
  ProposalExecutedReward: ProposalExecutedRewardData,
}; // each key have its own handler function

// contract events handler functions
async function StakeEventData(evendData) {
  try {
    const { blockNumber, transactionHash, returnValues, event, timestamp } =
      evendData;
    let isCreated = await stakes.create({
      user: returnValues?.user?.toLowerCase(),
      amount: Number(returnValues?.amount) / 1e18,
      txHash: transactionHash,
      block: blockNumber,
      timestamp: timestamp,
    });
    console.log(isCreated, "isCreated");

    if (!isCreated) {
      console.log("something went wrong");
    }
    return;
  } catch (e) {
    console.log("Error airdropEventHandler:", e.message);
    return;
  }
}

async function ProposalCreatedData(evendData) {
  try {
    const { blockNumber, transactionHash, returnValues, event, timestamp } =
      evendData;
    const depositObj = {
      user: returnValues.user?.toLowerCase(),
      proposalId: Number(returnValues.proposalId),
      startTime:returnValues.startTimestamp,
      endTime:returnValues.endTimestamp,
      name: returnValues.name,
      ipfshash: returnValues.ipfsHash,
      timestamp: timestamp,
      txHash: transactionHash,
      block: blockNumber,
    };

    const issaved = await proposals.create(depositObj);
    console.log(issaved, "issaved");

    return;
  } catch (e) {
    console.log(e, "Erorr in depositEventHandler");
    return;
  }
}

async function voteData(evendData) {
  try {
    const { blockNumber, transactionHash, returnValues, event, timestamp } =
      evendData;

    const directClaimObj = {
      user: returnValues.user.toLowerCase(),
      proposalId: returnValues.proposalId,
      isYes: returnValues.isYes,
      voteAmount: Number(returnValues.voteAmount),
      timestamp: timestamp,
      txHash: transactionHash,
      block: blockNumber,
    };

    const isCreate = await vote.create(directClaimObj);
    console.log(isCreate);
    return;
  } catch (e) {
    console.log(e, "Erorr in directClaimEventHandler");
    return;
  }
}

async function ExpireTimeChangedData(evendData) {
  try {
    const { blockNumber, transactionHash, returnValues, event, timestamp } =
      evendData;
    const docObj = {
      newExpireTime: returnValues.newExpireTime,
      timestamp: timestamp,
      txHash: transactionHash,
      block: blockNumber,
    };
    const res = await ExpireTime.create(docObj);
    console.log(res,"iscreate")

    return;
  } catch (e) {
    console.log(e, "Erorr in airdropClaimedEventHandler");
    return;
  }
}


async function DividentsClaimedData(evendData) {
  try {
    const { blockNumber, transactionHash, returnValues, event, timestamp } =
      evendData;
    const weeklyClaimObj = {
      user: returnValues.user.toLowerCase(),
      amount: Number(returnValues.amount) / 1e18,
      timestamp: timestamp,
      txHash: transactionHash,
      block: blockNumber,
    };
    const isCreate = await divident.create(weeklyClaimObj);
    console.log(isCreate);
    return;
  } catch (e) {
    console.log(e, "Erorr in weeklyClaimEventHandler");
    return;
  }
}

async function BlackListedData(evendData) {
  try {
    const { blockNumber, transactionHash, returnValues, event, timestamp } =
      evendData;
    const withdrawObj = {
      user: returnValues.user.toLowerCase(),
      isBlocked: returnValues.isBlocked,
      timestamp: timestamp,
      txHash: transactionHash,
      block: blockNumber,
    };

    const isCreate = await blackListed.create(withdrawObj);
    console.log(isCreate, "iscreate");
    return;
  } catch (e) {
    console.log(e, "Erorr in withdrawEventHandler");
    return;
  }
}

async function UnstakedData(evendData) {
  try {
    const { blockNumber, transactionHash, returnValues, event, timestamp } =
      evendData;
    const drawleadershipobj = {
      user: returnValues.user.toLowerCase(),
      amount: Number(returnValues.amount),
      timestamp: timestamp,
      txHash: transactionHash,
      block: blockNumber,
    };
    await unstakes.create(drawleadershipobj);

    return;
  } catch (e) {
    console.log(e, "Erorr in drawLeaderShipEventHandler");
    return;
  }
}
async function ProposalExecutedData(evendData) {
  try {
    const { blockNumber, transactionHash, returnValues, event, timestamp } =
      evendData;
    const drawleadershipobj = {
      proposalId: returnValues.proposalId,
      isPassed: returnValues.isPassed,
      timestamp: timestamp,
      txHash: transactionHash,
      block: blockNumber,
    };
    await ProposalExecuted.create(drawleadershipobj);

    return;
  } catch (e) {
    console.log(e, "Erorr in drawLeaderShipEventHandler");
    return;
  }
}
async function ProposalExecutedRewardData(evendData) {
  try {
    const { blockNumber, transactionHash, returnValues, event, timestamp } =
      evendData;
    const drawleadershipobj = {
      user: returnValues.user.toLowerCase(),
      proposalId: returnValues.proposalId,
      reward: Number(returnValues.reward),
      timestamp: timestamp,
      txHash: transactionHash,
      block: blockNumber,
    };
    await ProposalExecutedReward.create(drawleadershipobj);

    return;
  } catch (e) {
    console.log(e, "Erorr in drawLeaderShipEventHandler");
    return;
  }
}


module.exports = allEventsHandler;
