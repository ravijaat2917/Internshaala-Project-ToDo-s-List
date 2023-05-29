import React from "react";
import HomePage from "./Pages/HomePage";
import {
  BrowserRouter as Router,
  // Routes,
  // Route,
  useRoutes,
} from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";

const App = () => {
  let routes = useRoutes([
    { path: "/", element: <HomePage /> },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element:<Login/>
    }
  ]);
  return routes;
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
