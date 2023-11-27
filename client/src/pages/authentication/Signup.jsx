import { React, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Button, TextField, Typography, Grid, Card, Box,
} from '@mui/material';
import Layout from '../../components/layout/Layout';

function Signup() {
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [sex, setSex] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [citizenId, setCitizenId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const handleSignup = () => {
    // Add your signup logic here
  };

  async function getMessage() {
    // const result = await fetch('/api/message');
    // const json = await result.json();
    // temporary disable fetch
    const json = '';
    setMessage(json);
  }

  useEffect(() => {
    getMessage();
  }, []);

  return (
    <Layout>
      {/* message here is just to avoid ESLint warning */}
      {message}
      <Grid container justifyContent="center" alignItems="center" sx={{ height: '100%', marginTop: '5rem' }}>
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Card sx={{ padding: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', fontWeight: '500' }}>
              Đăng ký
            </Typography>
            <Box sx={{ mt: 3 }}>
              <form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Họ tên"
                      type="text"
                      fullWidth
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Giới tính"
                      type="text"
                      fullWidth
                      value={sex}
                      onChange={(e) => setSex(e.target.value)}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Ngày sinh"
                      type="date"
                      fullWidth
                      value={birthdate}
                      onChange={(e) => setBirthdate(e.target.value)}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Số CMND"
                      type="text"
                      fullWidth
                      value={citizenId}
                      onChange={(e) => setCitizenId(e.target.value)}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Email"
                      type="email"
                      fullWidth
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Mật khẩu"
                      type="password"
                      fullWidth
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Số điện thoại"
                      type="text"
                      fullWidth
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <Box sx={{ mt: 3 }}>
                  <Button variant="contained" color="primary" fullWidth onClick={handleSignup}>
                    Đăng ký
                  </Button>
                </Box>
              </form>
              <Box sx={{ mt: 3 }}>
                <Typography variant="body2" sx={{ textAlign: 'center' }}>
                  Đã có tài khoản?
                  {' '}
                  <RouterLink to="/login">Đăng nhập</RouterLink>
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default Signup;
