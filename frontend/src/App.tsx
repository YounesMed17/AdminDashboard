// import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  ScrollRestoration,
} from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Menu from "./components/menu/Menu";
import Error from "./pages/Error";
import Profile from "./pages/Profile";
import Notes from "./pages/Notes";
import Calendar from "./pages/Calendar";
import Charts from "./pages/Charts";
import Logs from "./pages/Logs";
import ToasterProvider from "./components/ToasterProvider";
import EditProfile from "./pages/EditProfile";
import User from "./pages/User";
import Login from "./pages/Login";
import Freelancers from "./pages/Freelancers";
import Clients from "./pages/Clients";
import VIPclients from "./pages/VIPclients";
import Projects from "./pages/Projects";
import Project from "./pages/Project";
import Reports from "./pages/reports";
import Admins from "./pages/Admins";
import Orders from "./pages/Orders";
import Products from "./pages/Products";

function App() {
  const Layout = () => {
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
          </div>
        </div>
        <Footer />
      </div>
    );
  };

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
          path: "/freelancers/:id",
          element: <Freelancers />,
        },
        {
          path: "/clients/:id",
          element: <Clients />,
        },
        {
          path: "/VIPClients/:id",
          element: <VIPclients />,
        },
        {
          path: "/projects/:id",
          element: <Projects />,
        },
        {
          path: "/users/:id",
          element: <User />,
        },
        {
          path: "/projects/:id",
          element: <Project />,
        },
        {
          path: "/reports/:id",
          element: <Reports />,
        },

        {
          path: "/admins/:id",
          element: <Admins />,
        },
        {
          path: "/orders/:id",
          element: <Orders />,
        },
        {
          path: "/products/:id",
          element: <Products />,
        },
        {
          path: "/notes",
          element: <Notes />,
        },
        {
          path: "/calendar",
          element: <Calendar />,
        },
        {
          path: "/charts",
          element: <Charts />,
        },
        {
          path: "/logs",
          element: <Logs />,
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
