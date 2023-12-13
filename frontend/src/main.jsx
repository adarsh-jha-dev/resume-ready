import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./components/Home.jsx"
import Login from "./components/Login/Login.jsx"
import SignUp from "./components/SignUp/SignUp.jsx"
import Profile from "./components/Profile/Profile.jsx"
import MakePost from "./components/MakePost.jsx"
import { UserState } from "./context/userState.jsx"
import Post from "./components/Post.jsx"
import Spinner from "./components/Spinner.jsx"
import NavBar from "./components/Navbar.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/makepost",
    element: <MakePost />,
  },
  {
    path: "/post/:id",
    element: <Post />,
  },
  {
    path: "/spinner",
    element: <Spinner message={"This is the spinner"} />,
  },
])

const token = localStorage.getItem("auth-token")

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserState>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </UserState>
  </React.StrictMode>
)
