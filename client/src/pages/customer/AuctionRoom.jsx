import React, { useState, useRef, useEffect } from 'react';
import {
  FormControl, Grid, TextField, Button, Card, Box, Typography,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import io from 'socket.io-client';
import Layout from '../../components/layout/Layout';
import PageTitle from '../../components/layout/PageTitle';
import useFetch from '../../hooks/useFetch';
import AuctionInfoPanel from '../../components/AuctionInfoPanel';
import AuctionBidList from '../../components/AuctionBidList';
import AuctionPlaceBid from '../../components/AuctionPlaceBid';
import Spinner from '../../components/Spinner';

function AuctionRoom() {
  const auctionId = useParams().id;
  const navigate = useNavigate();

  if (localStorage.getItem(auctionId) !== 'authorized') {
    navigate('/auction-room');
  }

  const [auction, setAuction] = useState(null);

  const serverUrl = process.env.REACT_APP_SERVER_URL;
  // const serverUrl = 'http://localhost:3000/';
  const { data, isLoading, error } = useFetch(`${serverUrl}/api/auction/${auctionId}}`);

  useEffect(() => {
    if (data) {
      setAuction(data);
    }
  }, [data, auctionId]);

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
    <Layout>
      <PageTitle>Phòng đấu giá</PageTitle>

      {isLoading && <Spinner />}
      {error && <div>{error}</div>}
      {!isLoading && !error && auction && (
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Box height="100%">
                  <AuctionInfoPanel auction={auction} />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box height="100%">
                  <AuctionBidList socket={socket} />
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={12}>
            <AuctionPlaceBid placeBid={placeBid} />
          </Grid>
        </Grid>
      )}
    </Layout>
  );
}

function AuctionCodeInput() {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [errorValidate, setErrorValidate] = useState('');

  const [auctionId, setAuctionId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorFetch, setErrorFetch] = useState(null);

  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const codeValidationUrl = `${serverUrl}/api/auction/verify`;

  const validateAuctionCode = async (event) => {
    event.preventDefault();
    const code = inputRef.current.value;
    const requestValidation = async () => {
      setIsLoading(true);
      try {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code }),
        };
        const res = await fetch(codeValidationUrl, requestOptions);
        const auction = await res.json();
        console.log(auction.id);
        setAuctionId(auction.id);
      } catch (err) {
        setErrorFetch(err);
      } finally {
        setIsLoading(false);
      }
    };

    requestValidation();
  };

  useEffect(() => {
    console.log(auctionId);
    if (auctionId) {
      if (auctionId !== 'undefined') {
        localStorage.setItem(auctionId, 'authorized');
        navigate(`/auction-room/${auctionId}`);
      } else {
        setErrorValidate('Mã đấu giá không chính xác. Vui lòng thử lại!');
      }
    }
  }, [auctionId]);

  return (
    <Layout>
      <>
        <PageTitle>Nhập mã đấu giá</PageTitle>

        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <form onSubmit={(e) => validateAuctionCode(e)}>
            <FormControl>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                p={2}
              >

                <TextField
                  id="auction-code"
                  label="Mã đấu giá"
                  inputRef={inputRef}
                />

                <Button
                  type="submit"
                  variant="contained"
                  style={{ marginTop: '16px', width: '100%' }}
                >
                  Xác nhận
                </Button>

              </Box>
            </FormControl>
          </form>
          {isLoading && <Spinner />}
          {errorFetch && (
            <Typography>
              Đã xảy ra lỗi khi xác nhận mã đấu giá. Vui lòng thử lại!
            </Typography>
          )}
          {errorValidate && <Typography>{errorValidate}</Typography>}
        </Card>
      </>
    </Layout>
  );
}

export default AuctionRoom;
export { AuctionCodeInput };
