const express = require("express");
const DscinfoRoutesController=require("../controller/DscinfoRoutesController");
const DscinfoRouter=express.Router();

DscinfoRouter.get("/stake-list",DscinfoRoutesController.getStakingList);
DscinfoRouter.get("/transction-history",DscinfoRoutesController.getStakeAndUnstakeList);
DscinfoRouter.get("/unstake-list",DscinfoRoutesController.getUnStakingList);
DscinfoRouter.get("/voting-list",DscinfoRoutesController.getVotingList);
DscinfoRouter.get("/proposal-list",DscinfoRoutesController.getProposalList);    
DscinfoRouter.get("/proposal-by-user", DscinfoRoutesController.getProposalListByUser);
DscinfoRouter.get("/proposal-by-id",DscinfoRoutesController.getProposalListById);
DscinfoRouter.get("/user-cliamlist",DscinfoRoutesController.getUserClaimList);
DscinfoRouter.get("/user-dashboarddata",DscinfoRoutesController.getDashbordData);
DscinfoRouter.get("/minimum-quorum",DscinfoRoutesController.getMinimumQuorumData);
DscinfoRouter.get("/delegators-data",DscinfoRoutesController.getDelegatorsData);
DscinfoRouter.get("/governance-data",DscinfoRoutesController.getStakingListByuser);



module.exports = DscinfoRouter;
