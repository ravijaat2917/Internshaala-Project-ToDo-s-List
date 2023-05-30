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
import EditListPage from "./Pages/EditListPage";
import RecentlyDeletedPage from "./Pages/RecentlyDeletedPage";

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
    },
    {
      path: '/edit-list/:id',
      element:<EditListPage/>
    },
    {
      path: '/recently-deleted',
      element:<RecentlyDeletedPage/>
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
