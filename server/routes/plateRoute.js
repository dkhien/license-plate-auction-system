import express from "express";

import {getPlates, getPlatesWithDate} from "../service/plateService.js";
import {sendCodeRoomMail} from "../utils/mail.js";
import {addCustomerToAuction, getAuctionByPlateId} from "../service/auctionService.js";

const plateRoute = express.Router();

plateRoute.get('/list', async (req, res) => {
  const plateList = await getPlatesWithDate();
  res.json(plateList)
})

plateRoute.post('/register', async (req, res) => {
  const {plateNumber, email, plateId, id} = req.body;
  const auction = await addCustomerToAuction(plateId, id);
  sendCodeRoomMail(email, plateNumber, Math.floor(100000 + Math.random() * 900000));
  res.json("ok")
})


export default plateRoute;


