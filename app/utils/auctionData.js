'use strict'

class AuctionData{
    constructor() {
    this.barAdminId = null;
    this.name = null;
    this.startBid = null;
    this.bidStep = null;
    this.prize = null;
    this.bar = null;
    this.start = null;
    this.end = null;
    this.isLive = null;
    this.currentBid = null;
    this._id = null;
    this.isFulfilled = false;
    this.isDeclared = false;
    }
}


module.exports = AuctionData;
