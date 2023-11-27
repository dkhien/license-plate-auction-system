import express from "express";

import {authenticate, register} from "../service/accountService.js";

const authRoute = express.Router();

authRoute.post('/login', async (req, res) => {
  try {
    const {email, password} = req.body;
    const account = await authenticate(email, password)
    res.json(account);
  } catch (e) {
    res.status(400).send(e)
  }
})

authRoute.post('/register', async (req, res) =>{
  const data = req.body;
  try {
    const account = await register(data)
    res.json(account)
  } catch (e) {
    console.log(e)
  }
})

export default authRoute;