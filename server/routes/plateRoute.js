import express from "express";

import {getPlates, getPlatesWithDate} from "../service/plateService.js";
import {getAuctionByPlateId} from "../service/auctionService.js";

const plateRoute = express.Router();

plateRoute.get('/list', async (req, res) => {
  const plateList = await getPlatesWithDate();
  res.json(plateList)
})

plateRoute.post('/register', async (req, res) => {
  const data = req.body;
})


export default plateRoute;


