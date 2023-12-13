import {getAuctionById, getCurrentPrice, updateAuctionBid} from "../service/auctionService.js";

export const connect = (socket) => {
  console.log(`a user connected from ${socket.handshake.address}`);
  socket.on('disconnect', () => {
    console.log(`a user disconnected from ${socket.handshake.address}`);
  });
};

export const socketService = (io, socket) => {
  const bid = (payload) => {
    try {
      let {auctionId, price, time, userId} = payload
      auctionId = parseInt(auctionId)
      io.to(auctionId).emit('auction:bid', payload)
      updateAuctionBid({price, time, userId, auctionId}) /* Comment when test socket only */
      console.log(payload)
    } catch (e) {
      console.log(e)
    }

  };
  socket.on('auction:bid', bid);
}

export const createRoom = (io, socket) => {
  socket.on('auction:join', async (payload) => {
    try {
      let {room} = payload
      room = parseInt(room)
      const price = await getCurrentPrice(room)
      const auction = await getAuctionById(room)
      io.emit('auction:join',{
        price: price,
        auction: auction
      })
      socket.join(room)
      console.log(`a user joined room ${room} from ${socket.handshake.address} with current price ${price}`)
    } catch (e) {
      console.log(e)
    }
  })
}


