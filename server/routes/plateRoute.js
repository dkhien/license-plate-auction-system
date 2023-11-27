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
  try {
    const { email, plateId, id: customerId} = req.body;
    const {code, plateNumber} = await addCustomerToAuction( plateId, customerId);
    sendCodeRoomMail(email, plateNumber,code);
    res.status(200).send('Registered successfully')
  } catch (e) {
    res.status(400).send('Registered unsuccessfully')
  }

})


export default plateRoute;


