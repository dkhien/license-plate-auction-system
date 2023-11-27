import React, { useState, useEffect } from 'react';
import {
  TextField, Button, Box, Grid, Card,
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
  // const [auctionInfo, setAuctionInfo] = useState({
  //   date: date.toISOString(),
  //   platePart1: '',
  //   platePart2: '',
  //   plateCity: '',
  //   plateType: '',
  //   auctioneerId: '',
  // });
  const provinceApi = process.env.REACT_APP_PROVINCE_API;
  const { data: provinceList, isLoading: isLoadingProvinceList, error: errorProvinceList } = useFetch(`${provinceApi}`);
  const { data: auctioneerList, isLoading: isLoadingAuctioneerList, error: errorAuctioneerList } = useFetch(`${process.env.REACT_APP_SERVER_URL}auctioneerList`);
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
      const options = auctioneerList.map((auctioneer) => auctioneer);
      setAuctioneerOptions(options);
    }
  }, [auctioneerList]);

  // const handleInputChange = (event) => {
  //   console.log(event.target.value);
  //   const { name, value } = event.target;

  //   setAuctionInfo((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Create objects and insert into the database using auctionInfo
    // console.log(auctionInfo);
  };

  return (
    <Layout>
      <PageTitle>Tạo đấu giá mới</PageTitle>
      <Grid container spacing={2}>

        <Grid item xs={12} md={6}>
          <Card sx={{ padding: '2rem' }}>
            <form onSubmit={handleSubmit}>

              <Box>
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
                />
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
                />
              </Box>

              <br />
              {isLoadingProvinceList && <Spinner />}
              {errorProvinceList && <div>{errorProvinceList}</div>}

              {!isLoadingProvinceList && !errorProvinceList && (
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

              )}
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
              <br />
              <DateTimePicker
                label="Thời gian bắt đầu đấu giá"
                value={date}
                onChange={(newDate) => setDate(newDate)}
              />
              {!isLoadingAuctioneerList && !errorAuctioneerList && (
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
              />
              )}
              <br />
              <Button type="submit" variant="contained" color="primary">
                Create Auction
              </Button>
            </form>
          </Card>

        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ padding: '2rem' }}>
            <LicensePlateImage plateNumber={`${plateNumberPart1} ${plateNumberPart2}`} />
          </Card>
        </Grid>
      </Grid>

    </Layout>
  );
}

export default AddAuction;
