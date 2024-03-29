import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Pagination from './Pagination';
import CSS from './CSS';
// import CountDown from './CountDown';
import CountDown from './CountDown2';
import Tzfe from './Tzfe';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/pagination",
    element: <Pagination />
  },
  { path: "/css",
  element: <CSS/>
},
  {path: "/countdown",
  element: <CountDown />
},{
  path: "/tzfe",
  element:<Tzfe />
}
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
