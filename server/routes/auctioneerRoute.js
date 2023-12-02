import express from "express";

import {getAllAuctioneers, createAuctioneer} from "../service/auctioneerService.js";

const auctioneerRouter = express.Router()
auctioneerRouter.post('/new', async (req, res) => {
  const auctioneer = {
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
    citizenId: req.body.citizenId,
    role: "AUCTIONEER"
  }
  const newAuctioneer =  await createAuctioneer(auctioneer);
  res.json(newAuctioneer)
})

auctioneerRouter.get('/all', async (req, res) => {
  try {
    const auctioneerList = await getAllAuctioneers();
    res.json(auctioneerList);
  } catch (e) {
    res.status(400).send(e)
  }
})

auctioneerRouter.get('/',(req, res) => {
  res.send('hello');
})

export default auctioneerRouter;