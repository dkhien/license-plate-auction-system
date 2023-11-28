import {updateAuctionBid} from "../service/auctionService.js";

export const connect = (socket) => {
  console.log(`a user connected from ${socket.handshake.address}`);
  socket.on('disconnect', () => {
    console.log('a user disconnected');
  });
};

export const socketService = (io, socket) => {
  const bid = (payload) => {
    const {auctionId, username, userId, time, price} = (payload)
    updateAuctionBid({price, time, userId, auctionId})
    console.log(auctionId)
    io.to(auctionId).emit('auction:bid', payload)
  };
  socket.on('auction:bid', bid);
}

export const createRoom = (io, socket) => {
  socket.on('auction:join', (room) => {
    socket.join(room)
    console.log(`a user joined room ${room} from ${socket.handshake.address}`)
  })
}


