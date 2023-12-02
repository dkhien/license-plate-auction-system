import React, { useState, useRef, useEffect } from 'react';
import {
  FormControl, Grid, TextField, Button, Card, Box, Typography, Modal,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import io from 'socket.io-client';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';
import Layout from '../../components/layout/Layout';
import PageTitle from '../../components/layout/PageTitle';
// import useFetch from '../../hooks/useFetch';
import AuctionInfoPanel from '../../components/AuctionInfoPanel';
import AuctionBidList from '../../components/AuctionBidList';
import AuctionPlaceBid from '../../components/AuctionPlaceBid';
import Spinner from '../../components/Spinner';
import StyledModalBox from '../../components/mui-custom/StyledModal';

function AuctionRoom() {
  const auctionId = useParams().id;
  const navigate = useNavigate();

  const [currentPrice, setCurrentPrice] = useState();

  if (localStorage.getItem(auctionId) !== 'authorized') {
    navigate('/auction-room');
  }

  const [auction, setAuction] = useState(null);

  const [bids, setBids] = useState([]);

  const serverUrl = process.env.REACT_APP_SERVER_URL;

  // const { data, isLoading, error } = useFetch(`${serverUrl}/api/auction/${auctionId}}`);

  useEffect(() => {
    if (auction) {
      console.log(auction);
      // setAuction(data);
      setBids((auction.bid != null && auction.bid.length > 0)
        ? auction.bid.sort((a, b) => b.price - a.price) : []);
    }
  }, [auction, auctionId]);

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_SOCKET_URL);
    setSocket(newSocket);
    console.log('Connecting socket...');
    newSocket.emit('auction:join', {
      room: auctionId,
    });
    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on('auction:join', (initialData) => {
      console.log('Current price: ', initialData.price);
      console.log('Auction: ', initialData.auction);
      const { price: currPrice, auction: auctionInfo } = initialData;
      setCurrentPrice(currPrice);
      setAuction(auctionInfo);
    });

    socket.on('auction:bid', (bid) => {
      setBids((prev) => [bid, ...prev]); // Add new bid to the beginning of the array
      setCurrentPrice(bid.price);
      console.log('Bid placed: ', bid);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    // eslint-disable-next-line consistent-return
    return () => {
      socket.off('auction:join');
      socket.off('disconnect');
    };
  }, [socket]);

  const placeBid = (bidPrice) => {
    if (!bidPrice) return;
    const newBid = {
      auctionId,
      username: localStorage.getItem('userName'),
      customerId: localStorage.getItem('customerId'),
      time: new Date().toISOString(),
      price: bidPrice,
    };

    socket.emit('auction:bid', newBid);
    console.log('Sending message:', newBid);
  };

  // MODAL
  const [isWinner, setWinner] = useState(true);
  const [open, setOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const [confirmationLoading, setConfirmationLoading] = useState(false);
  const [confirmationError, setConfirmationError] = useState(null);
  const handleClose = () => setOpen(false);
  const userId = localStorage.getItem('userId');
  const { width, height } = useWindowSize();

  const handleAuctionEnded = () => {
    if (auction && bids.length > 0) {
      // if user is winner, display confirm modal

      const winningBidder = bids[0].customerId.toString();
      console.log(bids[0]);
      if (userId === winningBidder) {
        console.log('Win: ', winningBidder);
        setWinner(true);
      } else {
        console.log('Lose: ', userId, winningBidder);
        setWinner(false);
      }
      setOpen(true);
    }
  };

  const handleConfirm = () => {
    if (isWinner) {
      const auctionConfirmationEndpoint = `${serverUrl}/api/auction/update-winner`;
      const confirmWinAuction = async () => {
        setConfirmationLoading(true);
        try {
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
              {
                customerId: userId,
                price: currentPrice,
                auctionId,
              },
            ),
          };
          const res = await fetch(auctionConfirmationEndpoint, requestOptions);
          if (!res.ok) {
            throw new Error('Error confirming auction result', res.status);
          }
        } catch (err) {
          setConfirmationError(err);
        } finally {
          setConfirmationLoading(false);
        }
      };
      confirmWinAuction();
    } else {
      navigate('/');
    }
    // Close the modal
    setOpen(false);
    setConfirmed(true);
  };

  return (
    <Layout>
      <PageTitle>Phòng đấu giá</PageTitle>

      {!auction && <Spinner />}
      {/* {error && <div>{error}</div>} */}
      {auction && (
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Box height="100%">
                  <AuctionInfoPanel auction={auction} handleAuctionEnded={handleAuctionEnded} />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box height="100%">
                  <AuctionBidList
                    socket={socket}
                    bids={bids}
                    setCurrentPrice={setCurrentPrice}
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={12}>
            <AuctionPlaceBid
              placeBid={placeBid}
              currentPrice={currentPrice}
            />
          </Grid>
        </Grid>
      )}

      {/* MODAL */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          {isWinner && (
          <Confetti width={width} height={height} />)}
          <StyledModalBox>
            {
            !confirmed && (
              <>
                <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                  {isWinner ? 'Thắng đấu giá'
                    : 'Rất tiếc, quý khách không phải người chiến thắng đấu giá'}
                </Typography>
                <Typography sx={{ mb: 2 }}>
                  {isWinner ? 'Chúc mừng quý khách là người chiến thắng đấu giá! Xác nhận thắng đấu giá biển số?'
                    : ''}
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
              <Typography variant="h6" component="h2" sx={{ mb: 2 }}>Xác nhận thành công!</Typography>
              <Button
                onClick={() => {
                  handleClose();
                  navigate('/');
                }}
                variant="contained"
              >
                Đóng
              </Button>
            </>
            )}
            {confirmationLoading && <Spinner />}
            {confirmationError && (
            <div>
              {confirmationError}
              <br />
              Vui lòng thử lại.
            </div>
            )}
          </StyledModalBox>
        </>

      </Modal>

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
        const userId = localStorage.getItem('customerId');
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code, id: userId }),
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
      if (auctionId !== 'undefined' && auctionId !== 'null') {
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
