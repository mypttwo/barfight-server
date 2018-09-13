"use strict";

const Bid = require("../models/bid").Bid;
const Auction = require("../models/auction").Auction;
const AuctionData = require("./auctionData");

let isAuctionLive = auctionId => {
  return Auction.findById(auctionId)
    .then(auction => auctionLiveStatus(auction)
    )
    .catch(error => {
      logger.error(error);
      return false;
    });
};

let auctionLiveStatus = auction => {
  let now = new Date();
  if (now > new Date(auction.start) && now < new Date(auction.end)) {
    return true;
  } else {
    return false;
  }
};

let getMaxBid = auctionId => {
  return Bid.find({ auctionId: auctionId })
    .then(data => {
      if (data.length > 0) {
        data.sort((a1, a2) => {
          return a2.value - a1.value;
        });
        return data[0];
      }
    })
    .catch(error => {
      logger.error(error);
      return false;
    });
};

let buildAuctionList = auctionRecList => {
  let auctionPromiseList = auctionRecList.map(a => {
    let ad = new AuctionData();
    ad.bar = a.bar;
    ad.barAdminId = a.barAdminId;
    ad.bidStep = a.bidStep;
    ad.end = a.end;
    ad.name = a.name;
    ad.prize = a.prize;
    ad.start = a.start;
    ad.startBid = a.startBid;
    ad._id = a._id;
    ad.isFulfilled = a.isFulfilled;
    ad.isDeclared = a.isDeclared;

    let now = new Date();
    if (now > new Date(a.start) && now < new Date(a.end)) {
      ad.isLive = true;
    } else {
      ad.isLive = false;
    }

    return getMaxBid(a._id).then(maxBid => {
      if (!maxBid) {
        ad.currentBid = ad.startBid;
      } else {
        ad.currentBid = maxBid.value;
      }

      return ad;
    });
  });

  return auctionPromiseList;
};

module.exports = {
  getMaxBid,
  isAuctionLive,
  auctionLiveStatus,
  buildAuctionList
};
