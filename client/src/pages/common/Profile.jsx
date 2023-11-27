import React, { useState } from 'react';
import {
  Avatar, Box, Button, List, ListItemAvatar, ListItemButton,
  ListItemText, Typography, Card, ListItem, Pagination, useTheme,
} from '@mui/material';
import EmojiPeopleOutlinedIcon from '@mui/icons-material/EmojiPeopleOutlined'; // Changed icon
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
// import Footer from '../../components/layout/Footer';
// import Header from '../../components/layout/Header';
// import Layout from '../../components/layout/Layout';

function Profile() {
  const [selectedTab, setSelectedTab] = useState('userInfo');

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <div style={{ display: 'flex', overflow: 'hidden' }}>
      <Sidebar selectedTab={selectedTab} handleTabChange={handleTabChange} />
      <MainContent selectedTab={selectedTab} />
    </div>
  );
}

function Sidebar({ selectedTab, handleTabChange }) {
  return (
    <div style={{ padding: '16px', minWidth: 250 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar alt="User Avatar" style={{ width: '80px', height: '80px', marginBottom: '16px' }} />
        <Typography variant="h5" sx={{ marginBottom: '16px' }}>
          username
        </Typography>
      </Box>

      <List>
        <ListItemButton selected={selectedTab === 'userInfo'} onClick={(event) => handleTabChange(event, 'userInfo')}>
          <ListItemAvatar>
            <EmojiPeopleOutlinedIcon />
            {' '}
            {/* Changed icon */}
          </ListItemAvatar>
          <ListItemText primary="Hồ sơ người dùng" />
        </ListItemButton>
        <ListItemButton selected={selectedTab === 'recentACTab'} onClick={(event) => handleTabChange(event, 'biddingHistory')}>
          <ListItemAvatar>
            <HistoryOutlinedIcon />
          </ListItemAvatar>
          <ListItemText primary="Lịch sử đấu giá" />
        </ListItemButton>
      </List>
      <Button variant="contained" color="primary" fullWidth sx={{ marginTop: '16px' }}>
        Cập nhật hồ sơ
      </Button>
    </div>
  );
}

function MainContent({ selectedTab }) {
  return (
    <Box sx={{ flexGrow: 1, padding: '24px' }}>
      {selectedTab === 'userInfo' && (
        <UserInfo />
      )}
      {selectedTab === 'biddingHistory' && (
        <BiddingHistory />
      )}
    </Box>
  );
}

function UserInfo() {
  // mock user data (username, name, email, phone number, address, date of birth, citizen ID)
  const userInfo = {
    username: 'username',
    name: 'name',
    email: 'email',
    phoneNumber: 'phoneNumber',
    address: 'address',
    dateOfBirth: 'dateOfBirth',
    citizenID: 'citizenID',
  };

  return (
    <Card>
      <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '1rem' }}>
        Hồ sơ người dùng
      </Typography>
      <Typography variant="h6">
        {userInfo.username}
      </Typography>
      <Typography variant="body1">
        Tên:
        {' '}
        {userInfo.name}
      </Typography>
      <Typography variant="body1">
        Email:
        {' '}
        {userInfo.email}
      </Typography>
      <Typography variant="body1">
        Phone Number:
        {' '}
        {userInfo.phoneNumber}
      </Typography>
      <Typography variant="body1">
        Date of Birth:
        {' '}
        {userInfo.dateOfBirth}
      </Typography>
      <Typography variant="body1">
        Citizen ID:
        {' '}
        {userInfo.citizenID}
      </Typography>
    </Card>
  );
}

function BiddingHistory() {
  const theme = useTheme();
  const bids = [
    {
      id: 1, price: 100, time: '2022-01-01 10:00:00', bidder: 'John',
    },
    {
      id: 2, price: 150, time: '2022-01-01 10:05:00', bidder: 'Alice',
    },
    {
      id: 3, price: 200, time: '2022-01-01 10:10:00', bidder: 'Bob',
    },
  ];

  // Pagination
  const [page, setPage] = React.useState(1);
  const handleChangePage = (_, value) => {
    setPage(value);
  };
  const paginationCount = 3;
  return (
    <Card sx={{ padding: '2rem', textAlign: 'center', height: '100%' }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '1rem' }}>
        Lịch sử đấu giá
      </Typography>
      <List>
        {bids.slice((page - 1) * paginationCount, page * paginationCount).map((item, index) => (
          <ListItem
            key={item.id}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderRadius: theme.shape.borderRadius,
              backgroundColor: index % 2 === 0 ? theme.palette.background.default
                : 'transparent',
              margin: theme.spacing(1),
              paddingLeft: '2rem',
              paddingRight: '2rem',
            }}
          >
            <ListItemText
              primary={item.price}
              secondary={`${item.time}`}
            />
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

export default Profile;
