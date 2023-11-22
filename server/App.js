import express from "express";
import { Server } from 'socket.io';
import{ createServer } from "http";
import {config} from "dotenv";
import cors from 'cors';
import bodyParser from 'body-parser';

import auctioneerRoute from "./routes/auctioneerRoute.js";
import plateRoute from "./routes/plateRoute.js";
import auctionRoute from "./routes/auctionRoute.js";
import customerRoute from "./routes/customerRoute.js";
import { connect, auctionSocket } from "./websocket/auctionSocket.js";

const app = express()
config()

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  }
})

app.use(cors())
app.use(bodyParser.json())

const onConnection = (socket) => {
  connect(socket);
  auctionSocket(io, socket);
}

io.on('connection', onConnection);

app.use('/api/auctioneer', auctioneerRoute)
app.use('/api/plate', plateRoute)
app.use('/api/auction', auctionRoute)
app.use('/api/customer', customerRoute)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

export default server;