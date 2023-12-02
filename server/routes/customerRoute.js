import express from "express";

import {getCustomerProfile, getCustomerRegisteredAuctions} from "../service/customerService.js";

const customerRoute = express.Router()

customerRoute.post('/profile', async (req, res) => {
  try {
    const id = parseInt(req.body.id);
    console.log(req.body.id)
    const profile = await getCustomerProfile(id);
    res.json(profile)
  } catch (e) {
    res.status(400).send(e)
  }
})

customerRoute.post('/plates', async (req, res) => {
  try {
    console.log(req.body)
    const id = parseInt(req.body.id);
    const plates = await getCustomerRegisteredAuctions(id);
    console.log(plates)
    res.json(plates)
  } catch (e) {
    res.status(400).send(e)
  }
})

export default customerRoute;