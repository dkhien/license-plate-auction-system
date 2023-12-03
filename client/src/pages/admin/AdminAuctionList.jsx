import React, { useEffect, useState } from 'react';
import {
  Autocomplete, Grid, TextField, Box, IconButton, Menu, MenuItem, Checkbox, Typography, CardContent,
  FormControlLabel,
} from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import Layout from '../../components/layout/Layout';
import PageTitle from '../../components/layout/PageTitle';
import useFetch from '../../hooks/useFetch';
import Spinner from '../../components/Spinner';
import vehicleTypes from '../../utils/vehicleTypeList';
import HoverableCard from '../../components/mui-custom/HoverableCard';
import LicensePlateImage from '../../components/LicensePlateImage';

function AdminAuctionList() {
  // const serverUrl = process.env.REACT_APP_SERVER_URL;
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const provinceApi = process.env.REACT_APP_PROVINCE_API;
  const { data: auctionList, isLoading, error } = useFetch(`${serverUrl}/api/plate/list`);
  const { data: provinceList, isLoading: isLoadingProvinceList, error: errorProvinceList } = useFetch(`${provinceApi}`);
  const [provinceOptions, setProvinceOptions] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedVehicleType, setSelectedVehicleType] = useState('');
  const [sortAscending, setSortAscending] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const [showStarted, setShowStarted] = useState(false);
  const [showNotStarted, setShowNotStarted] = useState(false);

  const filteredAuctionList = auctionList?.filter((auction) => {
    if (showStarted && new Date(auction.auction.date) > Date.now()) {
      return false;
    }
    if (showNotStarted && new Date(auction.auction.date) < Date.now()) {
      return false;
    }

    if (selectedProvince && selectedVehicleType) {
      return auction.city === selectedProvince && auction.typeOfVehicle === selectedVehicleType;
    } if (selectedProvince) {
      return auction.city === selectedProvince;
    } if (selectedVehicleType) {
      return auction.typeOfVehicle === selectedVehicleType;
    }
    return true;
  }).sort((a, b) => {
  // Sort by waiting time
    const dateA = new Date(a.auction.date);
    const dateB = new Date(b.auction.date);
    if (sortAscending) {
      return dateA - dateB;
    }
    return dateB - dateA;
  });

  const handleStartedChange = (event) => {
    setShowStarted(event.target.checked);
  };

  const handleNotStartedChange = (event) => {
    setShowNotStarted(event.target.checked);
  };

  useEffect(() => {
    if (provinceList) {
      const options = provinceList.map((province) => province.name);
      console.log(options);
      setProvinceOptions(options);
    }
  }, [provinceList]);

  const handleSortMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSortMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSortOptionSelect = (option) => {
    setSortAscending(option === 'asc');
    handleSortMenuClose();
  };

  return (
    <Layout>
      <PageTitle>Danh sách biển số đấu giá</PageTitle>

      {(isLoading) && <Spinner />}
      {(error) && <div>{error}</div>}

      {!isLoading && !error && (
        <>
          {isLoadingProvinceList && <Spinner />}
          {errorProvinceList && <div>{errorProvinceList}</div>}

          {!isLoadingProvinceList && !errorProvinceList && (
            <Box sx={{
              marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
            >

              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={provinceOptions}
                value={selectedProvince}
                onChange={(event, newValue) => {
                  setSelectedProvince(newValue);
                }}
                getOptionLabel={(option) => option}
                sx={{ width: 300, marginRight: '2rem' }}
                renderInput={(params) => <TextField {...params} label="Tỉnh/thành" />}
              />

              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={vehicleTypes}
                value={selectedVehicleType}
                onChange={(event, newValue) => {
                  setSelectedVehicleType(newValue);
                }}
                getOptionLabel={(option) => option}
                sx={{ width: 300, marginRight: '2rem' }}
                renderInput={(params) => <TextField {...params} label="Loại xe" />}
              />

              <IconButton
                aria-controls="sort-menu"
                aria-haspopup="true"
                onClick={handleSortMenuOpen}
                color="inherit"
                sx={{ marginRight: '2rem' }}
              >
                <SortIcon />
              </IconButton>

              <Menu
                id="sort-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleSortMenuClose}
              >
                <MenuItem onClick={() => handleSortOptionSelect('asc')}>Sớm nhất</MenuItem>
                <MenuItem onClick={() => handleSortOptionSelect('desc')}>Muộn nhất</MenuItem>
              </Menu>

              <FormControlLabel
                control={<Checkbox checked={showStarted} onChange={handleStartedChange} />}
                label="Đã bắt đầu"
              />
              <FormControlLabel
                control={<Checkbox checked={showNotStarted} onChange={handleNotStartedChange} />}
                label="Chưa bắt đầu"
              />

            </Box>

          )}

          <Grid container spacing={2}>
            {filteredAuctionList?.map((auction) => (
              <Grid item xs={12} md={2} key={auction.id}>
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
                  <LicensePlateImage plateNumber={auction.plateNumber} />
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body1">{auction.city.replace(/(Tỉnh|Thành phố)\s+/i, '')}</Typography>
                      <Typography variant="body1" sx={{ marginLeft: '1rem' }}>{auction.typeOfVehicle}</Typography>
                    </Box>
                    <Typography variant="body1" sx={{ marginTop: '0.5rem' }}>{new Date(auction.auction.date).toLocaleString()}</Typography>
                  </CardContent>
                </HoverableCard>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Layout>
  );
}

export default AdminAuctionList;
