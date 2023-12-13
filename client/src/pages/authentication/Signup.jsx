import { React, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Button, TextField, Typography, Grid, Card, Box, CircularProgress, FormControl,
} from '@mui/material';
import Layout from '../../components/layout/Layout';

function Signup() {
  const [name, setName] = useState('');
  const [citizenId, setCitizenId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [isRegisterLoading, setRegisterLoading] = useState(false);
  const [errorRegister, setErrorRegister] = useState(null);

  const navigate = useNavigate();

  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const signUpEndpoint = `${serverUrl}/auth/register`;

  const handleSignup = (e) => {
    e.preventDefault();
    const register = async () => {
      setRegisterLoading(true);
      try {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(
            {
              name,
              email,
              phone,
              password,
              citizenId,
            },
          ),
        };
        const res = await fetch(signUpEndpoint, requestOptions);
        if (res) {
          const data = await res.json();
          localStorage.setItem('userId', data.id);
          localStorage.setItem('userEmail', data.email);
          localStorage.setItem('userName', data.name);
          const userRole = data.role;
          localStorage.setItem('userRole', userRole);

          if (userRole === 'ADMIN') {
            localStorage.setItem('adminId', data.adminId);
            navigate('/admin');
          } else if (userRole === 'CUSTOMER') {
            localStorage.setItem('customerId', data.customerId);
            navigate('/');
          }
        }
      } catch (err) {
        setErrorRegister(err);
      } finally {
        setRegisterLoading(false);
      }
    };
    register();
  };

  return (
    <Layout>
      <Grid container justifyContent="center" alignItems="center" sx={{ height: '100%', marginTop: '5rem' }}>
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Card sx={{ padding: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', fontWeight: '500' }}>
              Đăng ký
            </Typography>
            <Box sx={{ mt: 3 }}>
              <form onSubmit={handleSignup}>
                <FormControl>

                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        label="Họ tên"
                        type="text"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        variant="outlined"
                        required
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
                        required
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
                        required
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
                        required
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
                        required
                      />
                    </Grid>
                  </Grid>
                  <Box sx={{ mt: 3 }}>
                    <Button type="submit" variant="contained" color="primary" fullWidth disabled={isRegisterLoading}>
                      {isRegisterLoading ? <CircularProgress size={24} color="inherit" /> : 'Đăng ký'}
                    </Button>
                  </Box>

                </FormControl>
              </form>
              {errorRegister && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="body2" sx={{ textAlign: 'center', color: 'red' }}>
                    {errorRegister.message}
                  </Typography>
                </Box>
              )}
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
