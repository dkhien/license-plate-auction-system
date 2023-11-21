import React from 'react';
import { Grid } from '@mui/material';
import Layout from '../../components/layout/Layout';
import PageTitle from '../../components/layout/PageTitle';
import LicensePlateCard from '../../components/LicensePlateCard';
import useFetch from '../../hooks/useFetch';
import Spinner from '../../components/Spinner';

function AuctionList() {
  const { data: auctionList, isLoading, error } = useFetch('auctionList');

  return (
    <Layout>
      <PageTitle>Danh sách biển số đấu giá</PageTitle>

      {isLoading && <Spinner />}
      {error && <div>{error}</div>}

      {!isLoading && !error && (
        <Grid container spacing={2}>
          {auctionList?.map((auction) => (
            <Grid item xs={12} md={2} key={auction.id}>
              <LicensePlateCard plate={auction.plate} />
            </Grid>
          ))}
        </Grid>
      )}
    </Layout>
  );
}

export default AuctionList;
