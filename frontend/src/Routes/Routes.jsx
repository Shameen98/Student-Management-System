import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AddStudent from "../pages/AddStudent";
import Home from "../pages/Home";

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
    ],
  },
]);

export default router;
