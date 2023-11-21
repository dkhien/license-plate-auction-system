import express from "express";

import {getProfileWithPlate} from "../service/customerService.js";

const customerRoute = express.Router()

customerRoute.post('/profile', async (req, res) => {
  console.log(req.body.id)
  const profile = await getProfileWithPlate(req.body.id);
  res.json(profile)
})


export default customerRoute;