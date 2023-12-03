import React, { useState, useEffect } from 'react';
import {
  Avatar, Box, List, ListItemAvatar, ListItemButton,
  ListItemText, Typography, Card, Grid, CardContent,
} from '@mui/material';
import EmojiPeopleOutlinedIcon from '@mui/icons-material/EmojiPeopleOutlined'; // Changed icon
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import Spinner from '../../components/Spinner';
import Layout from '../../components/layout/Layout';
import HoverableCard from '../../components/mui-custom/HoverableCard';
import LicensePlateImage from '../../components/LicensePlateImage';

function Profile() {
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const userProfileEndpoint = `${serverUrl}/api/customer/profile`;
  const userId = localStorage.getItem('customerId');

  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserInfo = async () => {
      setLoading(true);
      try {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(
            {
              id: userId,
            },
          ),
        };
        const res = await fetch(userProfileEndpoint, requestOptions);
        if (res) {
          const data = await res.json();
          console.log(data);
          setUserInfo(data);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    getUserInfo();
  }, []);

  const [selectedTab, setSelectedTab] = useState('userInfo');

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Layout>
      {loading && <Spinner />}
      {error && <Typography>{error}</Typography>}
      {userInfo && (

      <div style={{ display: 'flex', overflow: 'hidden' }}>
        <Sidebar
          selectedTab={selectedTab}
          handleTabChange={handleTabChange}
          userInfo={userInfo.account}
        />
        <MainContent selectedTab={selectedTab} userInfo={userInfo} />
      </div>
      )}
    </Layout>
  );
}

function Sidebar({ selectedTab, handleTabChange, userInfo }) {
  return (
    <div style={{ padding: '16px', minWidth: 250 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Avatar alt="User Avatar" style={{ width: '80px', height: '80px', marginBottom: '16px' }} />
        <Typography variant="h5" sx={{ marginBottom: '16px' }}>
          {userInfo.name}
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
      {/* <Button variant="contained" color="primary" fullWidth sx={{ marginTop: '16px' }}>
        Cập nhật hồ sơ
      </Button> */}
    </div>
  );
}

function MainContent({ selectedTab, userInfo }) {
  const userProfile = userInfo.account;
  const biddingHistory = userInfo.code;
  return (
    // const biddingHistory = userInfo.biddingHistory;
    <Box sx={{ flexGrow: 1, padding: '24px' }}>
      {selectedTab === 'userInfo' && (
        <UserInfo userProfile={userProfile} />
      )}
      {selectedTab === 'biddingHistory' && (
        <BiddingHistory biddingHistory={biddingHistory} />
      )}
    </Box>
  );
}

function UserInfo({ userProfile }) {
  const userInfo = {
    name: userProfile.name,
    email: userProfile.email,
    phoneNumber: userProfile.phone,
    citizenID: userProfile.citizenId,
  };

  return (
    <Card sx={{ padding: '2rem' }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '1rem' }}>
        Hồ sơ người dùng
      </Typography>
      <Box sx={{ marginBottom: '1rem' }}>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          Tên
        </Typography>
        <Typography variant="body1">
          {userInfo.name}
        </Typography>
      </Box>
      <Box sx={{ marginBottom: '1rem' }}>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          Email
        </Typography>
        <Typography variant="body1">
          {userInfo.email}
        </Typography>
      </Box>
      <Box sx={{ marginBottom: '1rem' }}>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          Số điện thoại
        </Typography>
        <Typography variant="body1">
          {userInfo.phoneNumber}
        </Typography>
      </Box>
      <Box>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          CCCD/CMND
        </Typography>
        <Typography variant="body1">
          {userInfo.citizenID}
        </Typography>
      </Box>
    </Card>
  );
}

function BiddingHistory({ biddingHistory }) {
  return (
    <Card sx={{ padding: '2rem' }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '1rem' }}>
        Lịch sử đấu giá
      </Typography>
      <Grid container spacing={2}>
        {biddingHistory?.map((item) => (
          <Grid item xs={12} md={3} key={item.auction.plate.id}>
            <HoverableCard
              sx={{
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <LicensePlateImage plateNumber={item.auction.plate.plateNumber} />
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1">{item.auction.plate.city.replace(/(Tỉnh|Thành phố)\s+/i, '')}</Typography>
                  <Typography variant="body1" sx={{ marginLeft: '1rem' }}>{item.auction.plate.typeOfVehicle}</Typography>
                </Box>
                <Typography variant="body1" sx={{ marginTop: '0.5rem' }}>{new Date(item.auction.date).toLocaleString()}</Typography>
                <Typography variant="h6" sx={{ marginTop: '0.5rem', color: item.auction.win ? '#56AE57' : '#c23b22' }}>
                  {item.auction.win ? 'THẮNG' : 'THUA'}
                </Typography>
              </CardContent>
            </HoverableCard>
          </Grid>
        ))}
      </Grid>
    </Card>
  );
}

export default Profile;
