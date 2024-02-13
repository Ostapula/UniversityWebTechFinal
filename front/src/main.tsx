import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './landing/App.tsx'
import SignIn from './singin/index.tsx';
import SignUp from './singup/index.tsx';
import Shop from './shop/index.tsx';
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import { Provider } from 'react-redux';
import { persistor, store } from './state/store.ts';
import './index.css'
import Admin from './admin/Admin.tsx';
import { PersistGate } from 'redux-persist/integration/react';
import Profile from './profile/Profile.tsx';
import ForgotPassword from './forgotpassword/ForgotPassword.tsx';
import Workshop from './workshop/Workshop.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/shop",
    element: <Shop />,
  },
  {
    path: "/admin",
    element: <Admin />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />
  },
  {
    path: "/workshop",
    element: <Workshop />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
