import express from "express";

import {authenticate, register} from "../service/accountService.js";
const authRoute = express.Router();

authRoute.post('/login', async (req, res) => {
  const {email, password} = req.body;
  const account = await authenticate(email, password)
  res.json(account);
})

authRoute.post('/register', async (req, res) =>{
  const data = req.body;
  const account = await register(data)
  res.json(account)
})

export default authRoute;