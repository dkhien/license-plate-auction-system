import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/authentication/Login';
import Logout from './pages/authentication/Logout';
import Home from './pages/customer/Home';
import Profile from './pages/common/Profile';
import NotFound from './pages/error/NotFound';
import AddAuction from './pages/admin/AddAuction';
import AuctionList from './pages/customer/AuctionList';
import AuctionRoom, { AuctionCodeInput } from './pages/customer/AuctionRoom';
import Test from './pages/test/Test';
import Signup from './pages/authentication/Signup';
import AuthWrapper from './pages/authentication/AuthWrapper';
import AdminAuctionList from './pages/admin/AdminAuctionList';

function App() {
  const routes = [
    // AUTHENTICATION ROUTES
    {
      path: '/login',
      element: <Login />,
      allowedRoles: [],
    },
    {
      path: '/logout',
      element: <Logout />,
      allowedRoles: [],
    },
    {
      path: '/signup',
      element: <Signup />,
      allowedRoles: [],
    },

    // COMMON ROUTES
    {
      path: '/profile',
      element: <Profile />,
      allowedRoles: ['ADMIN', 'CUSTOMER'],
    },

    // CUSTOMER ROUTES
    {
      path: '/',
      element: <Home />,
      allowedRoles: [],
    },
    {
      path: '/auction-list',
      element: <AuctionList />,
      allowedRoles: ['CUSTOMER'],
    },
    {
      path: '/auction-room',
      element: <AuctionCodeInput />,
      allowedRoles: ['CUSTOMER'],
    },
    {
      path: '/auction-room/:id',
      element: <AuctionRoom />,
      allowedRoles: ['CUSTOMER'],
    },

    // ADMIN ROUTES
    {
      path: '/admin/add-auction',
      element: <AddAuction />,
      allowedRoles: ['ADMIN'],
    },
    {
      path: '/admin/auction-list',
      element: <AdminAuctionList />,
      allowedRoles: ['ADMIN'],
    },

    // TEST ROUTE
    {
      path: '/test',
      element: <Test />,
      allowedRoles: [],
    },

    // ERROR ROUTE
    {
      path: '*',
      element: <NotFound />,
      allowedRoles: [],
    },

  ];

  return (
    <BrowserRouter>

      <Routes>
        {routes.map((route) => {
          if (route.allowedRoles.length > 0) {
            return (
              <Route
                key={route.path}
                element={<AuthWrapper allowedRoles={route.allowedRoles} />}
              >
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              </Route>
            );
          }
          return (
            <Route
              key={route.path}
              path={route.path}
              element={route.element}
            />
          );
        })}
      </Routes>

    </BrowserRouter>
  );
}

export default App;
