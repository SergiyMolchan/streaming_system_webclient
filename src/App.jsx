import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { Authentication } from "./authentication";
import { Room } from './room';

function App() {
  const publicRoutes = [
    {
      path: '/room',
      element: <Room />,
    },
    {
      path: '/authentication',
      element: <Authentication />,
    },
    {
      path: '*',
      element: <h1>404</h1>,
    },
  ];

  return (
      <Router>
        <div>
          <Routes>
            {
              publicRoutes.map((route, index) => (
                  <Route key={index} {...route} />
              ))
            }
          </Routes>
        </div>
      </Router>
  );
}


export default App;
