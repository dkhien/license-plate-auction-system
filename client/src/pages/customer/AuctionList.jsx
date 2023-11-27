import React, { useEffect, useState } from 'react';
import {
  Autocomplete, Grid, TextField, Box, IconButton, Menu, MenuItem, Modal, Typography, Button,
} from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import Layout from '../../components/layout/Layout';
import PageTitle from '../../components/layout/PageTitle';
import LicensePlateCard from '../../components/LicensePlateCard';
import useFetch from '../../hooks/useFetch';
import Spinner from '../../components/Spinner';
import vehicleTypes from '../../utils/vehicleTypeList';

function AuctionList() {
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
  const [open, setOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (provinceList) {
      const options = provinceList.map((province) => province.name);
      console.log(options);
      setProvinceOptions(options);
    }
  }, [provinceList]);

  const filteredAuctionList = auctionList?.filter((auction) => {
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

  const handleRegister = (plate) => {
    // pop up modal to confirm registration
    console.log(plate);
    setOpen(true);
  };

  const handleConfirm = () => {
    setConfirmed(true);
  };

  return (
    <Layout>
      <PageTitle>Danh sách biển số đấu giá</PageTitle>

      {isLoading && <Spinner />}
      {error && <div>{error}</div>}

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
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Loại xe" />}
              />

              <IconButton
                aria-controls="sort-menu"
                aria-haspopup="true"
                onClick={handleSortMenuOpen}
                color="inherit"
              >
                <SortIcon />
              </IconButton>

              <Menu
                id="sort-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleSortMenuClose}
              >
                <MenuItem onClick={() => handleSortOptionSelect('asc')}>Sort Ascending</MenuItem>
                <MenuItem onClick={() => handleSortOptionSelect('desc')}>Sort Descending</MenuItem>
              </Menu>

            </Box>

          )}

          <Grid container spacing={2}>
            {filteredAuctionList?.map((auction) => (
              <Grid item xs={12} md={2} key={auction.id}>
                <LicensePlateCard plate={auction} handleRegister={handleRegister} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
        >
          {
            !confirmed && (
              <>
                <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                  Xác nhận đăng ký
                </Typography>
                <Typography sx={{ mb: 2 }}>
                  Bạn có chắc chắn muốn đăng ký dấu giá biển số này?
                </Typography>
                <Button onClick={handleConfirm} variant="contained" sx={{ mr: 2 }}>
                  Xác nhận
                </Button>
                <Button onClick={handleClose} variant="contained">
                  Huỷ
                </Button>
              </>
            )
          }
          {confirmed && (
          <>
            <Typography variant="h6" component="h2" sx={{ mb: 2 }}>Đăng ký thành công!</Typography>
            <Button onClick={handleClose} variant="contained">
              Đóng
            </Button>
          </>
          )}
        </Box>
      </Modal>
    </Layout>
  );
}

export default AuctionList;
