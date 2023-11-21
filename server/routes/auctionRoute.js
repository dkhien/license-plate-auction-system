import express from "express";

import {createAuction, getALlDoneAuctions} from "../service/auctionService.js";

const auctionRouter = express.Router();

auctionRouter.post('/new', (req, res) => {
  const data = req.body;
  const auction = createAuction(data)
  res.json(auction)
})

auctionRouter.post('/room', (req, res) => {
  // TODO: return room data (plate, auctioneer, time)]
})

auctionRouter.get('/result', async (req, res) => {
  const data = getALlDoneAuctions();
  res.json(data)
})

export default auctionRouter;