// import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  ScrollRestoration,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Menu from "./components/menu/Menu";
import Error from "./pages/Error";
import Profile from "./pages/Profile";

import ToasterProvider from "./components/ToasterProvider";
import EditProfile from "./pages/EditProfile";
import User from "./pages/User";
import Login from "./pages/Login";
import Freelancers from "./pages/Freelancers";
import Clients from "./pages/Clients";
import VIPclients from "./pages/VIPclients";
import Projects from "./pages/Projects";
import Reports from "./pages/reports";
import Admins from "./pages/Admins";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Discussion from "./pages/ChatRoomss";
import { useState } from "react";
import { CircularProgress } from "@mui/material";

function App() {
  const Layout = () => {
    const navigate = useNavigate();

    function logout() {
      localStorage.clear();
      navigate("/login");
    }

    return (
      <div
        id="rootContainer"
        className="w-full p-0 m-0 overflow-visible min-h-screen flex flex-col justify-between"
      >
        <ToasterProvider />
        <ScrollRestoration />
        <div>
          <Navbar />
          <div className="w-full flex gap-0 pt-20 xl:pt-[96px] 2xl:pt-[112px] mb-auto">
            <div className="hidden xl:block xl:w-[250px] 2xl:w-[280px] 3xl:w-[350px] border-r-2 border-base-300 dark:border-slate-700 px-3 xl:px-4 xl:py-1">
              <Menu />
            </div>
            <div className="w-full px-4 xl:px-4 2xl:px-5 xl:py-2 overflow-clip">
              <Outlet />
            </div>
            <div>
              <button onClick={logout}>Logout</button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  const [role, setRole] = useState("");
  const getUserInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("id");

      if (token) {
        const response = await fetch(`http://localhost:3001/api/user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userInfo = await response.json();
          setRole(userInfo.role);
        } else {
          console.error("Failed to get user information:", response.statusText);
        }
      } else {
        console.error("Token not found.");
      }
    } catch (error) {
      console.error("Failed to get user information:", error);
    }
  };
  setInterval(
    () => {
      getUserInfo();
    },
    role == "" ? 1000 : 5000
  );
  const [timeoutReached, setTimeoutReached] = useState(false);

  function checkTimer() {
    if (role === "") {
      const timer = setTimeout(() => {
        role == "" ? setTimeoutReached(true) : setTimeoutReached(false);
      }, 3000); // 10 seconds
    }
    return () => clearTimeout(timer);
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/profile/edit",
          element: <EditProfile />,
        },
        {
          path: "/freelancers",
          element:
            role === "AccountsAdmin" || role === "SuperAdmin" ? (
              <Freelancers />
            ) : checkTimer() && !timeoutReached ? (
              <div className="flex justify-center items-center mt-[21%]">
                <CircularProgress disableShrink />
              </div>
            ) : (
              <h1
                className="flex justify-center items-center mt-[150px] "
                style={{ color: "red", fontWeight: "bold", fontSize: "55px" }}
              >
                You Are Not Authorized Here !
              </h1>
            ),
        },
        {
          path: "/clients",
          element:
            role === "AccountsAdmin" || role === "SuperAdmin" ? (
              <Clients />
            ) : checkTimer() && !timeoutReached ? (
              <div className="flex justify-center items-center mt-[21%]">
                <CircularProgress disableShrink />
              </div>
            ) : (
              <h1
                className="flex justify-center items-center mt-[150px] "
                style={{ color: "red", fontWeight: "bold", fontSize: "55px" }}
              >
                You Are Not Authorized Here !
              </h1>
            ),
        },

        {
          path: "/VIPClients",
          element:
            role === "AccountsAdmin" || role === "SuperAdmin" ? (
              <VIPclients></VIPclients>
            ) : checkTimer() && !timeoutReached ? (
              <div className="flex justify-center items-center mt-[21%]">
                <CircularProgress disableShrink />
              </div>
            ) : (
              <h1
                className="flex justify-center items-center mt-[150px] "
                style={{ color: "red", fontWeight: "bold", fontSize: "55px" }}
              >
                You Are Not Authorized Here !
              </h1>
            ),
        },

        {
          path: "/projects",
          element:
            role === "ProjectsAdmin" || role === "SuperAdmin" ? (
              <Projects />
            ) : checkTimer() && !timeoutReached ? (
              <div className="flex justify-center items-center mt-[21%]">
                <CircularProgress disableShrink />
              </div>
            ) : (
              <h1
                className="flex justify-center items-center mt-[150px] "
                style={{ color: "red", fontWeight: "bold", fontSize: "55px" }}
              >
                You Are Not Authorized Here !
              </h1>
            ),
        },

        {
          path: "/users/:id",
          element:
            role === "AccountsAdmin" || role === "SuperAdmin" ? (
              <User />
            ) : checkTimer() && !timeoutReached ? (
              <div className="flex justify-center items-center mt-[21%]">
                <CircularProgress disableShrink />
              </div>
            ) : (
              <h1
                className="flex justify-center items-center mt-[150px] "
                style={{ color: "red", fontWeight: "bold", fontSize: "55px" }}
              >
                You Are Not Authorized Here !
              </h1>
            ),
        },

        {
          path: "/reports",
          element:
            role === "ChatsAdmin" || role === "SuperAdmin" ? (
              <Reports />
            ) : checkTimer() && !timeoutReached ? (
              <div className="flex justify-center items-center mt-[21%]">
                <CircularProgress disableShrink />
              </div>
            ) : (
              <h1
                className="flex justify-center items-center mt-[150px] "
                style={{ color: "red", fontWeight: "bold", fontSize: "55px" }}
              >
                You Are Not Authorized Here !
              </h1>
            ),
        },

        {
          path: "/admins",
          element:
            role === "SuperAdmin" || role === "SuperAdmin" ? (
              <Admins />
            ) : checkTimer() && !timeoutReached ? (
              <div className="flex justify-center items-center mt-[21%]">
                <CircularProgress disableShrink />
              </div>
            ) : (
              <h1
                className="flex justify-center items-center mt-[150px] "
                style={{ color: "red", fontWeight: "bold", fontSize: "55px" }}
              >
                You Are Not Authorized Here !
              </h1>
            ),
        },

        {
          path: "/orders",
          element:
            role === "SuperAdmin" || role === "AccountsAdmin" ? (
              <Orders />
            ) : checkTimer() && !timeoutReached ? (
              <div className="flex justify-center items-center mt-[21%]">
                <CircularProgress disableShrink />
              </div>
            ) : (
              <h1
                className="flex justify-center items-center mt-[150px] "
                style={{ color: "red", fontWeight: "bold", fontSize: "55px" }}
              >
                You Are Not Authorized Here !
              </h1>
            ),
        },

        {
          path: "/products",
          element:
            role === "SuperAdmin" || role === "AccountsAdmin" ? (
              <Products />
            ) : checkTimer() && !timeoutReached ? (
              <div className="flex justify-center items-center mt-[21%]">
                <CircularProgress disableShrink />
              </div>
            ) : (
              <h1
                className="flex justify-center items-center mt-[150px] "
                style={{ color: "red", fontWeight: "bold", fontSize: "55px" }}
              >
                You Are Not Authorized Here !
              </h1>
            ),
        },

        {
          path: "/chatRoomss/:id",
          element: <Discussion />,
        },
      ],
      errorElement: <Error />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
