import express from "express";

import {createAuction, getALlDoneAuctions, getRoomInfo, verifyCode} from "../service/auctionService.js";

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

export default auctionRouter;