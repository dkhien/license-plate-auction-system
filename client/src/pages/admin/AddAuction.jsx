import React, { useState, useEffect } from 'react';
import {
  TextField, Button, Grid, Card, Box,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import Spinner from '../../components/Spinner';
import useFetch from '../../hooks/useFetch';
import vehicleTypes from '../../utils/vehicleTypeList';
import Layout from '../../components/layout/Layout';
import PageTitle from '../../components/layout/PageTitle';
import LicensePlateImage from '../../components/LicensePlateImage';

function AddAuction() {
  const [date, setDate] = useState(dayjs());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const provinceApi = process.env.REACT_APP_PROVINCE_API;
  const { data: provinceList, isLoading: isLoadingProvinceList, error: errorProvinceList } = useFetch(`${provinceApi}`);
  const { data: auctioneerList, isLoading: isLoadingAuctioneerList, error: errorAuctioneerList } = useFetch(`${process.env.REACT_APP_SERVER_URL}/api/auctioneer/all`);
  const [provinceOptions, setProvinceOptions] = useState([]);
  const [auctioneerOptions, setAuctioneerOptions] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedVehicleType, setSelectedVehicleType] = useState(null);
  const [selectedAuctioneer, setSelectedAuctioneer] = useState(null);

  const [plateNumberPart1, setPlateNumberPart1] = useState('');
  const [plateNumberPart2, setPlateNumberPart2] = useState('');

  useEffect(() => {
    if (provinceList) {
      const options = provinceList.map((province) => province.name);
      setProvinceOptions(options);
    }
  }, [provinceList]);

  useEffect(() => {
    if (auctioneerList) {
      const options = auctioneerList.map((auctioneer) => `${auctioneer.name} (${auctioneer.email})`);
      setAuctioneerOptions(options);
    }
  }, [auctioneerList]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const auctionInfo = {
      city: selectedProvince,
      date: date.toISOString(),
      plateNumber: `${plateNumberPart1}-${plateNumberPart2}`,
      auctioneer: 1,
      typeOfVehicle: selectedVehicleType,
    };

    setIsLoading(true);
    setError(null);

    function postAuction() {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(auctionInfo),
      };
      fetch(`${process.env.REACT_APP_SERVER_URL}/api/auction/new`, requestOptions)
        .then((response) => {
          setIsLoading(false);
          if (!response.ok) {
            throw new Error('Failed to create auction');
          }
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err.message);
        });
    }
    postAuction();
  };

  return (
    <Layout>
      <PageTitle>Tạo cuộc đấu giá mới</PageTitle>
      <Card sx={{
        padding: '2rem', display: 'flex', justifyContent: 'space-between',
      }}
      >
        <Box sx={{ flex: '3', marginRight: '5%' }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  type="text"
                  name="platePart1"
                  label="Biển số (phần 1)"
                  inputProps={{ maxLength: 4 }}
                  value={plateNumberPart1}
                  onChange={(e) => {
                    setPlateNumberPart1(e.target.value);
                  }}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  type="text"
                  name="platePart2"
                  label="Biển số (phần 2)"
                  inputProps={{ maxLength: 5 }}
                  value={plateNumberPart2}
                  onChange={(e) => {
                    setPlateNumberPart2(e.target.value);
                  }}
                  required
                  fullWidth
                />
              </Grid>
              {isLoadingProvinceList && <Spinner />}
              {errorProvinceList && <div>{errorProvinceList}</div>}

              {!isLoadingProvinceList && !errorProvinceList && (
                <Grid item xs={12} md={6}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={provinceOptions}
                    value={selectedProvince}
                    onChange={(event, newValue) => {
                      setSelectedProvince(newValue);
                    }}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => <TextField {...params} label="Tỉnh/thành" />}

                  />
                </Grid>
              )}
              <Grid item xs={12} md={6}>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={vehicleTypes}
                  value={selectedVehicleType}
                  onChange={(event, newValue) => {
                    setSelectedVehicleType(newValue);
                  }}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => <TextField {...params} label="Loại xe" />}
                />
              </Grid>

              {!isLoadingAuctioneerList && !errorAuctioneerList && (
                <Grid item xs={12} md={12}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={auctioneerOptions}
                    value={selectedAuctioneer}
                    onChange={(event, newValue) => {
                      setSelectedAuctioneer(newValue);
                    }}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => <TextField {...params} label="Đấu giá viên" />}
                    sx={{ marginBottom: '1.5rem' }}
                  />
                </Grid>
              )}
            </Grid>

            <Grid item xs={12} md={12}>
              <DateTimePicker
                label="Thời gian bắt đầu đấu giá"
                value={date}
                onChange={(newDate) => setDate(newDate)}
              />
            </Grid>

            {isLoading && <Spinner />}
            {error && <div>{error}</div>}
            <Button type="submit" variant="contained" color="primary" size="large" sx={{ marginTop: '3rem' }}>
              Tạo đấu giá
            </Button>
          </form>
        </Box>

        <Box sx={{ flex: '1' }}>
          <LicensePlateImage plateNumber={`${plateNumberPart1}-${plateNumberPart2}`} />
        </Box>
      </Card>
    </Layout>
  );
}

export default AddAuction;
