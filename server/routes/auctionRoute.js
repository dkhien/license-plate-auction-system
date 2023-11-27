import express from "express";

import {createAuction, getALlDoneAuctions, getAuctionById, getRoomInfo, verifyCode} from "../service/auctionService.js";

const auctionRouter = express.Router();

auctionRouter.post('/new', async (req, res) => {
  try {
    const data = req.body;
    const auction = await createAuction(data)
    res.json(auction)
  } catch (e) {
    res.status(400).send(e)
  }
})

auctionRouter.post('/room', async (req, res) => {
  // TODO: return room data (plate, auctioneer, time)]
  try {
    const {code, id} = req.body
    const roomInfo = await getRoomInfo(code, id);
    res.json(roomInfo)
  } catch (e) {
    res.status(400).send(e)
  }
})

auctionRouter.get('/result', async (req, res) => {
  try {
    const data = await getALlDoneAuctions();
    res.json(data)
  } catch (e) {
    res.status(400).send(e)
  }
})

auctionRouter.post('/verify', async(req, res) => {
  try {
    const {code, id} = req.body
    const data = await verifyCode(code, id)
    res.json(data)
  } catch (e) {
    res.status(400).send(e)
  }
})

// route to search for 1 auction by its id (/auction/:id)
auctionRouter.get('/:id', async (req, res) => {
  try {
    const auctionId = parseInt(req.params.id)
    const auction = await getAuctionById(auctionId);
    res.json(auction)
  } catch (e) {
    res.status(400).send(e)
  }
})

export default auctionRouter;