import React, { useEffect, useState } from 'react';
import {
  Card, List, ListItem, ListItemText, Pagination, useTheme, Typography,
} from '@mui/material';

function AuctionBidList({ socket }) {
  const theme = useTheme();

  // mock bid data
  const [bids, setBids] = useState([
    {
      id: 1, price: 100, time: '2022-01-01 10:00:00', bidder: 'John',
    },
    {
      id: 2, price: 150, time: '2022-01-01 10:05:00', bidder: 'Alice',
    },
    {
      id: 3, price: 200, time: '2022-01-01 10:10:00', bidder: 'Bob',
    },
  ]);

  useEffect(() => {
    if (!socket) return;

    socket.on('auction:bid', (bid) => {
      setBids((prev) => [bid, ...prev]); // Add new bid to the beginning of the array
      console.log('Bid placed: ', bid);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    // eslint-disable-next-line consistent-return
    return () => {
      socket.off('auction:bid');
      socket.off('disconnect');
    };
  }, [socket]);

  // Pagination
  const [page, setPage] = React.useState(1);
  const handleChangePage = (_, value) => {
    setPage(value);
  };
  const paginationCount = 3;
  return (
    <Card sx={{ padding: '2rem', textAlign: 'center', height: '100%' }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '1rem' }}>
        Diễn biến cuộc đấu giá
      </Typography>
      <List>
        {bids
          .slice((page - 1) * paginationCount, page * paginationCount)
          .map((item, index) => (
            <ListItem
              key={item.id}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: theme.shape.borderRadius,
                backgroundColor:
                  index % 2 === 0 ? theme.palette.background.default : 'transparent',
                margin: theme.spacing(1),
                paddingLeft: '2rem',
                paddingRight: '2rem',
              }}
            >
              <ListItemText primary={item.price} secondary={`${item.time}`} />
              <ListItemText primary={item.bidder} sx={{ textAlign: 'right' }} />
            </ListItem>
          ))}
      </List>
      <Pagination
        count={Math.ceil(bids.length / paginationCount)}
        page={page}
        onChange={handleChangePage}
      />
    </Card>
  );
}

export default AuctionBidList;
