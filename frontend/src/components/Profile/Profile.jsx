import React, { useContext } from "react"
import NavBar from "../Navbar.jsx"
import UserContext from "../../context/userContext.jsx"
import { FiLogOut } from "react-icons/fi"
import { useNavigate } from "react-router-dom"

export default function Profile() {
  const navigate = useNavigate()
  const { user, logout } = useContext(UserContext)

  const handleLogout = (e) => {
    e.preventDefault()
    localStorage.removeItem("auth-token")
    logout()
    navigate("/home")
  }

  return (
    <>
      <NavBar transparent />
      <main className="profile-page">
        <section className="relative block" style={{ height: "0px" }}>
          <div
            className="absolute top-0 w-full h-[80%] bg-center bg-cover"
            style={{
              backgroundImage: `url(${user.coverImage})`,
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
            style={{ height: "70px" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-gray-300 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <div className="border-4 border-gray-200 rounded-full overflow-hidden">
                        <img
                          alt="..."
                          src={user.avatar}
                          className="shadow-xl rounded-full w-[170px] h-[200px] align-middle absolute -m-16 -ml-20 lg:-ml-16"
                          style={{
                            maxWidth: "150px",
                            border: "10px solid rgb(236, 72, 153)",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0">
                      <button
                        className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                        onClick={handleLogout}
                      >
                        <FiLogOut
                          onClick={handleLogout}
                          className="inline-block mr-2"
                        />
                        Logout
                      </button>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                          {user.posts.length}
                        </span>
                        <span className="text-sm text-gray-500">
                          Post{user.posts.length > 1 ? "s" : ""}
                        </span>
                      </div>
                      <div className="lg:mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                          {user.comments.length}
                        </span>
                        <span className="text-sm text-gray-500">Comments</span>
                      </div>
                      <div className="lg:mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                          {user.followers.length}
                        </span>
                        <span className="text-sm text-gray-500">Followers</span>
                      </div>
                      <div className="lg:mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                          {user.following.length}
                        </span>
                        <span className="text-sm text-gray-500">Following</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal text-gray-800 mb-2">
                    {user.username}
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>{" "}
                    {user.firstname + " " + user.lastname}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
