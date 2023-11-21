import express from "express";

import {createAuctioneer} from "../service/auctioneerService.js";

const auctioneerRouter = express.Router()
auctioneerRouter.post('/new', async (req, res) => {
  const auctioneer = {
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
  }
  const newAuctioneer =  await createAuctioneer(auctioneer);
  res.json(newAuctioneer)
})

auctioneerRouter.get('/',(req, res) => {
  res.send('hello');
})

export default auctioneerRouter;