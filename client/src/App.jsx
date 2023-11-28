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
    {
      path: '/signup',
      element: <Signup />,
      isPrivate: false,
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
      isPrivate: false,
    },
    {
      path: '/auction-list',
      element: <AuctionList />,
      isPrivate: true,
    },
    {
      path: '/auction-room',
      element: <AuctionCodeInput />,
      isPrivate: true,
    },
    {
      path: '/auction-room/:id',
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
        {routes.map((route) => {
          if (route.isPrivate) {
            return (
              <Route
                key={route.path}
                element={<AuthWrapper />}
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
