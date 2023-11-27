import express from "express";

import {createAuction, getALlDoneAuctions, getRoomInfo, verifyCode, getAuctionById} from "../service/auctionService.js";

const auctionRouter = express.Router();

auctionRouter.post('/new', async (req, res) => {
  const data = req.body;
  const auction = await createAuction(data)
  res.json(auction)
})

auctionRouter.post('/room', async (req, res) => {
  // TODO: return room data (plate, auctioneer, time)]
  const {code, id} = req.body
  const roomInfo = await getRoomInfo(code, id);
  res.json(roomInfo)
})

auctionRouter.get('/result', async (req, res) => {
  const data = await getALlDoneAuctions();
  res.json(data)
})

auctionRouter.post('/verify', async(req, res) => {
  const {code, id} = req.body
  const data = await verifyCode(code, id)
  res.json(data)
})

// route to search for 1 auction by its id (/auction/:id)
auctionRouter.get('/:id', async (req, res) => {
  const auctionId = parseInt(req.params.id)
  const auction = await getAuctionById(auctionId);
  res.json(auction)
})

export default auctionRouter;