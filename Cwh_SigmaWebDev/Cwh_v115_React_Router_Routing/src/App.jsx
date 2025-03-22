import "./App.css";
import {NavBar, Home, About, Contact, Login, User, Footer } from "./components";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}

function App() {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/about", element: <About /> },
        { path: "/contact", element: <Contact /> },
        { path: "/login", element: <Login /> },
        { path: "/user/:userName", element: <User /> },
        { path: "*", element: <h1>404 - Page Not Found</h1> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
