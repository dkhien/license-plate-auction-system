import React, { useEffect, useState } from 'react';
import {
  Autocomplete, Grid, TextField, Box, IconButton, Menu, MenuItem, Modal, Typography, Checkbox,
  Button, FormControlLabel,
} from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import Layout from '../../components/layout/Layout';
import PageTitle from '../../components/layout/PageTitle';
import LicensePlateCard from '../../components/LicensePlateCard';
import useFetch from '../../hooks/useFetch';
import Spinner from '../../components/Spinner';
import vehicleTypes from '../../utils/vehicleTypeList';
import StyledModalBox from '../../components/mui-custom/StyledModal';

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
  const [selectedPlate, setSelectedPlate] = useState(null);
  const [registeredPlates, setRegisteredPlates] = useState(null);

  const userId = localStorage.getItem('customerId');
  const [registeredPlatesLoading, setregisteredPlatesLoading] = useState(false);
  const [registeredPlatesError, setRegisteredPlatesError] = useState(null);

  const [showRegistered, setShowRegistered] = useState(false);
  const [showUnregistered, setShowUnregistered] = useState(false);
  const [showStarted, setShowStarted] = useState(false);
  const [showNotStarted, setShowNotStarted] = useState(false);

  const filteredAuctionList = auctionList?.filter((auction) => {
    if (showRegistered && !registeredPlates.includes(auction.id)) {
      return false;
    }
    if (showUnregistered && registeredPlates.includes(auction.id)) {
      return false;
    }
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

  const handleRegisteredChange = (event) => {
    setShowRegistered(event.target.checked);
  };

  const handleUnregisteredChange = (event) => {
    setShowUnregistered(event.target.checked);
  };

  const handleStartedChange = (event) => {
    setShowStarted(event.target.checked);
  };

  const handleNotStartedChange = (event) => {
    setShowNotStarted(event.target.checked);
  };

  const registeredPlatesEndpoint = `${serverUrl}/api/customer/plates`;
  useEffect(() => {
    const getUserInfo = async () => {
      setregisteredPlatesLoading(true);
      try {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: userId,
          }),
        };
        const res = await fetch(registeredPlatesEndpoint, requestOptions);
        if (res) {
          const data = await res.json();
          console.log(data);
          const registeredPlatesList = data.map((item) => item.auction.plate.id);
          setRegisteredPlates(registeredPlatesList);
        }
      } catch (err) {
        setRegisteredPlatesError(err);
      } finally {
        setregisteredPlatesLoading(false);
      }
    };
    getUserInfo();
  }, []);

  const handleRegister = (plate) => {
    // Check if the plate is already registered
    if (registeredPlates.includes(plate.id)) {
      return;
    }

    // pop up modal to confirm registration
    setOpen(true);
    setConfirmed(false);
    setSelectedPlate(plate);
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

  const [isRegisterLoading, setRegisterLoading] = useState(false);
  const [errorRegister, setErrorRegister] = useState(null);

  const auctionRegisterEndpoint = `${serverUrl}/api/plate/register`;

  const handleConfirm = () => {
    const registerForAuction = async () => {
      setRegisterLoading(true);
      try {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(
            {
              email: localStorage.getItem('userEmail'),
              plateId: selectedPlate.id,
              id: userId,
            },
          ),
        };
        const res = await fetch(auctionRegisterEndpoint, requestOptions);
        if (!res.ok) {
          throw new Error('Error registering for auction', res.status);
        }
      } catch (err) {
        setErrorRegister(err);
      } finally {
        setRegisterLoading(false);
      }
    };

    registerForAuction();

    // Update the registered plates
    setRegisteredPlates([...registeredPlates, selectedPlate.id]);

    // Close the modal
    setOpen(false);
    setConfirmed(true);
  };

  return (
    <Layout>
      <PageTitle>Danh sách biển số đấu giá</PageTitle>

      {(isLoading || registeredPlatesLoading) && <Spinner />}
      {(error || registeredPlatesError) && <div>{error}</div>}

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
                control={<Checkbox checked={showRegistered} onChange={handleRegisteredChange} />}
                label="Đã đăng ký"
              />
              <FormControlLabel
                control={(
                  <Checkbox
                    checked={showUnregistered}
                    onChange={handleUnregisteredChange}
                  />
)}
                label="Chưa đăng ký"
              />
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
                <LicensePlateCard
                  plate={auction}
                  handleRegister={handleRegister}
                  isRegistered={
                    (registeredPlates != null) ? registeredPlates.includes(auction.id) : false
}
                />
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
        <StyledModalBox>
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
          {isRegisterLoading && <Spinner />}
          {errorRegister && (
          <div>
            {errorRegister}
            <br />
            Vui lòng thử lại.
          </div>
          )}
        </StyledModalBox>
      </Modal>
    </Layout>
  );
}

export default AuctionList;
