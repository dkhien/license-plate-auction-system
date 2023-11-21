export const connect = (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
};

export const auctionSocket = (io, socket) => {
  const bid = (payload) => {
    console.log('bid', payload)
    io.emit('auction:bid', payload)
  };
  socket.on('auction:bid', bid);
}