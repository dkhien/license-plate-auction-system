import express from "express";

import {getPlatesWithDate} from "../service/plateService.js";
import {sendCodeRoomMail} from "../utils/mail.js";
import {addCustomerToAuction} from "../service/auctionService.js";

const plateRoute = express.Router();

plateRoute.get('/list', async (req, res) => {
  try {
    const plateList = await getPlatesWithDate();
    res.json(plateList)
  } catch (e) {
    res.status(400).send(e)
  }
})

plateRoute.post('/register', async (req, res) => {
  try {
    let {email, plateId, id: customerId} = req.body;
    plateId = parseInt(plateId);
    customerId = parseInt(customerId);
    const {code, plateNumber} = await addCustomerToAuction(plateId, customerId);
    sendCodeRoomMail(email, plateNumber, code);
    console.log(plateNumber, code)
    res.status(200).send('Registered successfully')
  } catch (e) {
    res.status(400).send('Registered unsuccessfully', e)
  }

})


export default plateRoute;


