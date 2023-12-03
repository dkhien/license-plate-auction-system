import React from 'react';
import {
  Card, List, ListItem, ListItemText, Pagination, useTheme, Typography,
} from '@mui/material';

function AuctionBidList({
  bids,
}) {
  const theme = useTheme();

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
              <ListItemText
                primary={item.price}
                secondary={new Date(item.time).toLocaleTimeString()}
              />
              <ListItemText primary={item.username} sx={{ textAlign: 'right' }} />
            </ListItem>
          ))}

        {bids.length > 0 && (
        <Pagination
          count={Math.ceil(bids.length / paginationCount)}
          page={page}
          onChange={handleChangePage}
        />
        )}
      </List>

    </Card>
  );
}

export default AuctionBidList;
