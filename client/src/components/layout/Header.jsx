import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import vpaLogo from '../../assets/images/vpa-logo.svg';

function Header() {
  const userRole = localStorage.getItem('userRole');
  let pages = ['Trang chủ', 'Danh sách biển số', 'Phòng đấu giá'];
  let routes = ['/', '/auction-list', '/auction-room'];

  if (userRole === 'ADMIN') {
    pages = ['Trang chủ', 'Danh sách biển số', 'Tạo đấu giá'];
    routes = ['/', '/admin/auction-list', '/admin/add-auction'];
  }

  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const userLoggedIn = localStorage.getItem('userId') !== null;

  return (
    <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          {/* Large Screen Logo */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, marginRight: '8px' }}>
            <Link to="/">
              <img
                src={vpaLogo}
                alt="Logo"
                style={{
                  width: 'auto',
                  height: '40px',
                  maxWidth: '100%',
                }}
              />
            </Link>
          </Box>

          {/* Small Screen Navigation Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem
                  key={page}
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to={routes[index]}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Small Screen Logo */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 1, justifyContent: 'center' }}>
            <Link to="/">
              <img
                src={vpaLogo}
                alt="Logo"
                style={{
                  width: 'auto',
                  height: '40px',
                  maxWidth: '100%',
                }}
              />
            </Link>
          </Box>

          {/* Large Screen Navigation Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, index) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'inherit', display: 'block' }}
                component={Link}
                to={routes[index]}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Typography sx={{ display: { xs: 'none', md: 'block' }, mr: 2 }}>
            {localStorage.getItem('userName')}
          </Typography>
          {/* Avatar */}
          <Box sx={{ flexGrow: 0 }}>
            {userLoggedIn ? (
              <>
                {/* Avatar Button */}
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="User Avatar" />
                </IconButton>

                {/* Avatar Menu */}
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {userRole === 'CUSTOMER'
                  && (
                  <MenuItem
                    key={0}
                    onClick={handleCloseUserMenu}
                    component={Link}
                    to="/profile"
                  >
                    <Typography textAlign="center">Hồ sơ</Typography>
                  </MenuItem>
                  )}

                  <MenuItem
                    key={1}
                    onClick={handleLogout}
                  >
                    <Typography textAlign="center">Đăng xuất</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                onClick={() => navigate('/login')}
                sx={{ my: 2, color: 'inherit', display: 'block' }}
              >
                Đăng nhập
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
