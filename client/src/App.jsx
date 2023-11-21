import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/authentication/Login';
import Logout from './pages/authentication/Logout';
import Home from './pages/customer/Home';
import Profile from './pages/common/Profile';
import NotFound from './pages/error/NotFound';
import AddAuction from './pages/admin/AddAuction';
import AuctionList from './pages/customer/AuctionList';
import AuctionRoom from './pages/customer/AuctionRoom';
import Test from './pages/test/Test';

function App() {
  const routes = [
    // AUTHENTICATION ROUTES
    {
      path: '/login',
      element: <Login />,
      isPrivate: false,
    },
    {
      path: '/logout',
      element: <Logout />,
      isPrivate: true,
    },

    // COMMON ROUTES
    {
      path: '/profile',
      element: <Profile />,
      isPrivate: true,
    },

    // CUSTOMER ROUTES
    {
      path: '/',
      element: <Home />,
      isPrivate: true,
    },
    {
      path: '/auction-list',
      element: <AuctionList />,
      isPrivate: true,
    },
    {
      path: '/auction-room',
      element: <AuctionRoom />,
      isPrivate: true,
    },

    // ADMIN ROUTES
    {
      path: '/admin',
      element: <AddAuction />,
      isPrivate: true,
    },

    // TEST ROUTE
    {
      path: '/test',
      element: <Test />,
      isPrivate: false,
    },

    // ERROR ROUTE
    {
      path: '*',
      element: <NotFound />,
      isPrivate: false,
    },

  ];

  return (
    <BrowserRouter>

      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
          />
        ))}
      </Routes>

    </BrowserRouter>
  );
}

export default App;
