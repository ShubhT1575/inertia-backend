const stake = require("../models/stakes");
const vote = require("../models/vote");
const expiretime = require("../models/ExpireTime");
const divident = require("../models/divident");
const blacklist = require("../models/blackListed");
const unstakes = require("../models/unstakes");
const { isValidEthereumAddress } = require("../utils/web3");
const stakes = require("../models/stakes");
const proposals = require("../models/proposals");
const ProposalExecuted = require("../models/ProposalExecuted");

module.exports = {
  getStakeAndUnstakeList: async (req, res) => {
    try {
      const { userAddress, page, limit } = req.query;
      if (!userAddress) {
        return res.json({
          message: "Please provide user Address",
          status: 400,
        });
      }
      if (!isValidEthereumAddress(userAddress)) {
        return res.json({
          message: "Sorry invalid user address",
          status: 400,
        });
      }

      const user = userAddress.toLowerCase();
      const paginationOptions = {
        $skip: (page - 1) * limit,
        $limit: parseInt(limit),
      };

      const [stakes, unstake] = await Promise.all([
        stake.aggregate([
          { $match: { user } },
          { $skip: paginationOptions.$skip },
          { $limit: paginationOptions.$limit },
        ]),
        unstakes.aggregate([
          { $match: { user } },
          { $skip: paginationOptions.$skip },
          { $limit: paginationOptions.$limit },
        ]),
      ]);

      return res.json({
        message: "User stake and unstake list",
        status: 200,
        data: {
          stakes,
          unstake,
        },
      });
    } catch (e) {
      console.log(e, "Error in getStakeAndUnstakeList");
      return res.json({
        message: "Internal server error",
        status: 500,
      });
    }
  },

  getStakingList: async (req, res) => {
    try {
      //   const userAddress = "0xA227B7B9F05474071645342249D1CEC575F09BC9";
      const { userAddress} = req.query;
      if (!userAddress) {
        return res.json({
          message: "Please provide user Address",
          status: 400,
        });
      }
      if (!isValidEthereumAddress(userAddress)) {
        return res.json({
          message: "Sorry invalid user address",
          status: 400,
        });
      }

      const data = await stake
        .find({
          user: userAddress?.toLowerCase(),
        })
        // .skip((page - 1) * limit)
        // .limit(limit);

      if (data) {
        return res.json({
          message: "user stake list",
          status: 200,
          data,
        });
      } else {
        return res.json({
          message: "something went wrong",
          status: 500,
        });
      }
    } catch (e) {
      console.log(e, "Error in getStakeList");
      return res.json({
        message: "Internel server error",
        status: 500,
      });
    }
  },
  getUnStakingList: async (req, res) => {
    try {
      const { userAddress, page, limit } = req.query;
      if (!userAddress) {
        return res.json({
          message: "Please provide user Address",
          status: 400,
        });
      }
      if (!isValidEthereumAddress(userAddress)) {
        return res.json({
          message: "Sorry invalid user address",
          status: 400,
        });
      }

      const data = await unstakes
        .find({
          user: userAddress?.toLowerCase(),
        })
        .skip((page - 1) * limit)
        .limit(limit);

      if (data) {
        return res.json({
          message: "user unstake list",
          status: 200,
          data,
        });
      } else {
        return res.json({
          message: "something went wrong",
          status: 500,
        });
      }
    } catch (e) {
      console.log(e, "Error in getUnstakeList");
      return res.json({
        message: "Internel server error",
        status: 500,
      });
    }
  },
  getVotingList: async (req, res) => {
    try {
      const { proposalId, page, limit } = req.query;
      console.log(proposalId);
      if (!proposalId) {
        return res.json({
          message: "Please provide proposalId ",
          status: 400,
        });
      }

      const data = await vote
        .find({
          proposalId: proposalId,
        })
        .skip((page - 1) * limit)
        .limit(limit);

      if (data) {
        return res.json({
          message: "Voting list",
          status: 200,
          data,
        });
      } else {
        return res.json({
          message: "something went wrong",
          status: 500,
        });
      }
    } catch (e) {
      console.log(e, "Error in getVotingList");
      return res.json({
        message: "Internel server error",
        status: 500,
      });
    }
  },
  getProposalList: async (req, res) => {
    try {
      const { page, limit } = req.query;
      const data = await proposals
        .find({})
        .skip((page - 1) * limit)
        .limit(limit);
      if (data) {
        return res.json({
          message: "proposal  list",
          status: 200,
          data,
        });
      } else {
        return res.json({
          message: "something went wrong",
          status: 500,
        });
      }
    } catch (e) {
      console.log(e, "Error in getProposalList");
      return res.json({
        message: "Internel server error",
        status: 500,
      });
    }
  },
  getProposalListByUser: async (req, res) => {
    try {
      const { userAddress, page, limit } = req.query;
      if (!userAddress) {
        return res.json({
          message: "Please provide user Address",
          status: 400,
        });
      }
      if (!isValidEthereumAddress(userAddress)) {
        return res.json({
          message: "Sorry invalid user address",
          status: 400,
        });
      }
      const data = await proposals
        .find({ user: userAddress.toLowerCase() })
        .skip((page - 1) * limit)
        .limit(limit);
      if (data) {
        return res.json({
          message: "proposal by user list",
          status: 200,
          data,
        });
      } else {
        return res.json({
          message: "something went wrong",
          status: 500,
        });
      }
    } catch (e) {
      console.log(e, "Error in getProposalByUserList");
      return res.json({
        message: "Internel server error",
        status: 500,
      });
    }
  },
  getUserClaimList: async (req, res) => {
    try {
      const { userAddress, page, limit } = req.query;
      const wallet = userAddress.toLowerCase();
      if (!userAddress) {
        return res.json({
          message: "Please provide user Address",
          status: 400,
        });
      }
      if (!isValidEthereumAddress(userAddress)) {
        return res.json({
          message: "Sorry invalid user address",
          status: 400,
        });
      }

      const data = await divident
        .find({ user: wallet })
        .skip((page - 1) * limit)
        .limit(limit);
      if (data) {
        return res.json({
          message: "proposal by user list",
          status: 200,
          data,
        });
      } else {
        return res.json({
          message: "something went wrong",
          status: 500,
        });
      }
    } catch (e) {
      console.log(e, "Error in getProposalByUserList");
      return res.json({
        message: "Internel server error",
        status: 500,
      });
    }
  },
  getProposalListById: async (req, res) => {
    try {
      const { ProposalIpfs, page, limit } = req.query;
      console.log(ProposalIpfs);
      const data = await proposals
        .find({ ipfshash: ProposalIpfs })
        .skip((page - 1) * limit)
        .limit(limit);
      if (data) {
        return res.json({
          message: "proposal by proposalId",
          status: 200,
          data,
        });
      } else {
        return res.json({
          message: "something went wrong",
          status: 500,
        });
      }
    } catch (e) {
      console.log(e, "Error in getProposalById");
      return res.json({
        message: "Internel server error",
        status: 500,
      });
    }
  },
  getDashbordData: async (req, res) => {
    try {
      const { userAddress } = req.query;
      const wallet = userAddress.toLowerCase();

      // Aggregate total staked amount
      const stakeData = stakes.aggregate([
        { $match: { user: wallet } },
        {
          $group: {
            _id: null,
            totalStaked: { $sum: "$amount" },
          },
        },
      ]);

      // Aggregate total unstaked amount
      const unstakeData = unstakes.aggregate([
        { $match: { user: wallet } },
        {
          $group: {
            _id: null,
            totalUnstaked: { $sum: "$amount" },
          },
        },
      ]);
      const totalclaim = divident.aggregate([
        { $match: { user: wallet } },
        {
          $group: {
            _id: null,
            totalClaim: { $sum: "$amount" },
          },
        },
      ]);
      const allres = await Promise.all([stakeData, unstakeData, totalclaim]);
      console.log(allres);
      return res.json({
        message: "Dashboard data",
        status: 200,
        data: {
          totalStake: allres?.[0]?.[0]?.totalStaked ?? 0,
          totalUnStake: allres?.[1]?.[0]?.totalUnstaked ?? 0,
          totalClaim: allres?.[2]?.[0]?.totalClaim ?? 0,
        },
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      return res.status(500).json({
        message: "Something went wrong",
        status: 500,
        error: error.message,
      });
    }
  },
  getMinimumQuorumData: async (req, res) => {
    try {
      // Aggregate total stake per unique wallet address
      const userStakeData = await stake.aggregate([
        {
          $group: {
            _id: "$user", // Group by wallet address
            totalStaked: { $sum: "$amount" }, // Sum all staked amounts for each user
          },
        },
        {
          $project: {
            _id: 0,
            user: "$_id", // Rename `_id` to `walletAddress`
            totalStaked: 1,
          },
        },
      ]);
      const voters = await vote.distinct("user");

      // Step 2: Aggregate total stake for only those users who have voted
      const voterStakeData = await stake.aggregate([
        {
          $match: { user: { $in: voters } }, // Match only users who are in the vote list
        },
        {
          $group: {
            _id: "$user", // Group by user
            totalStaked: { $sum: "$amount" }, // Sum all stake amounts
          },
        },
        {
          $project: {
            _id: 0,
            user: "$_id", // Rename `_id` to user
            totalStaked: 1,
          },
        },
      ]);
      // Get total number of users and total stake amount
      const totalVoters = voterStakeData.length;
      const totalVoterStakeAmount = voterStakeData.reduce(
        (sum, user) => sum + user.totalStaked,
        0
      );

      const totalUsers = userStakeData.length;
      const totalStakeAmount = userStakeData.reduce(
        (sum, user) => sum + user.totalStaked,
        0
      );

      return res.json({
        message: "Total stake details grouped by unique wallet addresses",
        status: 200,
        data: {
          totalVoters,
          totalVoterStakeAmount,
          totalUsers, // Unique users who have staked
          totalStakeAmount, // Sum of all stakes across users
          userDetails: userStakeData, // List of users and their total staked amounts
        },
      });
    } catch (e) {
      console.error("Error in getMinimumQuorumData:", e);
      return res.status(500).json({
        message: "Internal server error",
        status: 500,
      });
    }
  },
  getDelegatorsData:async (req, res) => {
    try {
      // Aggregate total stake per unique wallet address
      const userStakeData = await stake.aggregate([
        {
          $group: {
            _id: "$user", // Group by wallet address
            totalStaked: { $sum: "$amount" }, // Sum all staked amounts for each user
          },
        },
        {
          // Lookup claimed amount from the claims collection
          $lookup: {
            from: "divident", // Assuming the collection name is 'claims'
            localField: "_id", // Match the user field
            foreignField: "user", // Match with user in claims collection
            as: "claimData",
          },
        },
        {
          // Lookup unstake amount from the unstake collection
          $lookup: {
            from: "UnStake", // Assuming the collection name is 'unstake'
            localField: "_id", // Match the user field
            foreignField: "user", // Match with user in unstake collection
            as: "unstakeData",
          },
        },
        {
          $addFields: {
            totalClaimed: { $sum: "$claimData.amount" }, // Sum all claimed amounts
            totalUnstaked: { $sum: "$unstakeData.amount" }, // Sum all unstaked amounts
          },
        },
        {
          $project: {
            _id: 0,
            user: "$_id", // Rename `_id` to `walletAddress`
            totalStaked: 1,
            totalClaimed: 1, // Include total claimed amount
            totalUnstaked: 1, // Include total unstaked amount
          },
        },
      ]);
      
      const voters = await vote.distinct("user");
  
      // Aggregate total stake for only those users who have voted
      const voterStakeData = await stake.aggregate([
        {
          $match: { user: { $in: voters } },
        },
        {
          $group: {
            _id: "$user",
            totalStaked: { $sum: "$amount" },
          },
        },
        {
          $lookup: {
            from: "votes",
            localField: "_id",
            foreignField: "user",
            as: "voteData",
          },
        },
        {
          $unwind: {
            path: "$voteData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "proposal",
            localField: "voteData.proposalId",
            foreignField: "proposalId",
            as: "proposalData",
          },
        },
        {
          $unwind: {
            path: "$proposalData",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            _id: 0,
            user: "$_id",
            totalStaked: 1,
            proposalId: { $ifNull: ["$voteData.proposalId", null] },
            voteAmount: { $ifNull: ["$voteData.voteAmount", 0] },
            timestamp: { $ifNull: ["$voteData.timestamp", null] },
            proposalName: { $ifNull: ["$proposalData.name", null] },
          },
        },
      ]);
      
      // Get total number of users and total stake amount
      const totalVoters = voterStakeData.length;
      const totalVoterStakeAmount = voterStakeData.reduce((sum, user) => sum + user.totalStaked, 0);
      const totalUsers = userStakeData.length;
      const totalStakeAmount = userStakeData.reduce((sum, user) => sum + user.totalStaked, 0);
      const totalClaimedAmount = userStakeData.reduce((sum, user) => sum + (user.totalClaimed || 0), 0);
      const totalUnstakedAmount = userStakeData.reduce((sum, user) => sum + (user.totalUnstaked || 0), 0);
  
      return res.json({
        message: "Total stake details grouped by unique wallet addresses",
        status: 200,
        data: {
          voterdata: voterStakeData,
          totalVoters,
          totalVoterStakeAmount,
          totalUsers, // Unique users who have staked
          totalStakeAmount, // Sum of all stakes across users
          totalClaimedAmount, // Total claimed amount
          totalUnstakedAmount, // Total unstaked amount
          userDetails: userStakeData, // List of users and their total staked, claimed & unstaked amounts
        },
      });
    } catch (e) {
      console.error("Error in getDelegatorsData:", e);
      return res.status(500).json({
        message: "Internal server error",
        status: 500,
      });
    }
},
getStakingListByuser: async (req, res) => {
  try {
    const { userAddress, page = 1, limit = 10 } = req.query;
    if (!userAddress) {
      return res.json({
        message: "Please provide user Address",
        status: 400,
      });
    }
    if (!isValidEthereumAddress(userAddress)) {
      return res.json({
        message: "Sorry invalid user address",
        status: 400,
      });
    }

    const lowerCaseUserAddress = userAddress.toLowerCase();

    // Fetch stake data for the user with pagination
    const data = await stake
      .find({ user: lowerCaseUserAddress })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    // Aggregate total staked amount for the user
    const totalStakeAmount = await stake.aggregate([
      {
        $match: { user: lowerCaseUserAddress },
      },
      {
        $group: {
          _id: null,
          totalStaked: { $sum: "$amount" },
        },
      },
    ]);

    // Aggregate total stake amount across all users
    const totalStakeAllUsers = await stake.aggregate([
      {
        $group: {
          _id: null,
          totalStaked: { $sum: "$amount" },
        },
      },
    ]);

    return res.json({
      message: "User stake list and total staked amount",
      status: 200,
      data,
      totalStaked: totalStakeAmount.length > 0 ? totalStakeAmount[0].totalStaked : 0,
      totalStakedAllUsers: totalStakeAllUsers.length > 0 ? totalStakeAllUsers[0].totalStaked : 0,
    });
  } catch (e) {
    console.log(e, "Error in getStakingList");
    return res.json({
      message: "Internal server error",
      status: 500,
    });
  }
},
getExecutedProposal: async (req, res) => {
  try {
    const data = await ProposalExecuted.find().sort({createdAt:-1});
    if (data) {
      return res.json({
        message: "Executed proposal list",
        status: 200,
        data,
      });
    } else {
      return res.json({
        message: "something went wrong",
        status: 500,
      });
    }
  } catch (error) {
    console.log(error, "Error in getExecutedProposal");
    return res.json({
      message: "Internal server error",
      status: 500,
    });
  }
}
};
