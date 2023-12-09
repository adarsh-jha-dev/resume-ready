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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserState>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </UserState>
  </React.StrictMode>
)
