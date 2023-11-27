import {
  Grid,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import AuctionBidList from './AuctionBidList';
import AuctionPlaceBid from './AuctionPlaceBid';

function AuctionBidPanel() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_SERVER_URL);
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

  const placeBid = (bidPrice) => {
    if (!bidPrice) return;
    const newBid = {
      price: bidPrice,
      bidder: 'customer',
      time: new Date().toISOString(),
    };
    socket.emit('auction:bid', newBid);
    console.log('Sending message:', newBid);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
        <AuctionBidList socket={socket} />
      </Grid>

      <Grid item xs={12} md={12}>
        <AuctionPlaceBid placeBid={placeBid} />
      </Grid>
    </Grid>
  );
}

export default AuctionBidPanel;
