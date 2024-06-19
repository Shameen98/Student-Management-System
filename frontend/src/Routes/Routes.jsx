import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AddStudent from "../pages/AddStudent";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/add",
        element: <AddStudent />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
