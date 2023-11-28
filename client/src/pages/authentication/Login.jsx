import { React, useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Button, TextField, Typography, Grid, Card, Box,
} from '@mui/material';
import Layout from '../../components/layout/Layout';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      navigate('/');
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // TODO
      if (response) {
        const userInfo = await response.json();
        console.log(userInfo);
        // Save to local storage
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userName', userInfo.name);
        localStorage.setItem('userId', userInfo.id);
        localStorage.setItem('userRole', userInfo.role);

        // Redirect to homepage
        if (userInfo.role === 'ADMIN') {
          navigate('/admin');
        } else if (userInfo.role === 'CUSTOMER') {
          navigate('/');
        }
      } else {
        // Display error message
        console.log('User not found');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <Grid container justifyContent="center" alignItems="center" sx={{ height: '100%', marginTop: '5rem' }}>
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Card sx={{ padding: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', fontWeight: '500' }}>
              Đăng nhập
            </Typography>
            <Box sx={{ mt: 3 }}>
              <form>
                <Grid container spacing={2}>
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
                </Grid>
                <Box sx={{ mt: 3 }}>
                  <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
                    Đăng nhập
                  </Button>
                </Box>
              </form>
              <Box sx={{ mt: 3 }}>
                <Typography variant="body2" sx={{ textAlign: 'center' }}>
                  Chưa có tài khoản?
                  {' '}
                  <RouterLink to="/signup">Đăng ký</RouterLink>
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default Login;
