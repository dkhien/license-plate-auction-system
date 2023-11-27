import express from "express";

import {getProfileWithPlate} from "../service/customerService.js";

const customerRoute = express.Router()

customerRoute.post('/profile', async (req, res) => {
  try {
    console.log(req.body.id)
    const profile = await getProfileWithPlate(req.body.id);
    res.json(profile)
  } catch (e) {
    res.status(400).send(e)
  }
})


export default customerRoute;