import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AddStudent from "../pages/AddStudent";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import DeleteStudent from "../pages/DeleteStudent";
import UpdateStudent from "../pages/UpdateStudent";

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
        path: "/delete",
        element: <DeleteStudent />,
      },
      {
        path: "/update",
        element: <UpdateStudent />,
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
