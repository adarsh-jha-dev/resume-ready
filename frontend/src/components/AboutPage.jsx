import React from "react"
import NavBar from "./Navbar.jsx"
import {
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaEnvelope,
} from "react-icons/fa"

const AboutPage = () => {
  return (
    <div className="flex flex-col space-y-3">
      <NavBar />

      <div className="bg-gray-500 min-h-screen rounded-2xl">
        <div className="container flex flex-col mx-auto sm:p-1 lg:p-2 rounded-xl">
          <div className="text-center lg:flex lg:flex-row sm:flex sm:flex-col md:flex md:flex-col pt-6">
            <h1 className="lg:text-6xl md:text-4xl md:m-2 sm:text-start md:text-start sm:text-2xl md:mb-2 font-bold">
              About Blogstagram
            </h1>
            <div className="lg:text-lg sm:text-sm lg:w-[500px] sm:w-[250px] text-start ml-4 text-gray-700 flex flex-col leading-loose">
              <p className="text-white">
                Welcome to Blogstagram, your go-to platform for engaging
                stories, insightful articles, and inspiring content. We believe
                in the power of sharing and aim to connect people through the
                art of storytelling.
              </p>
              <p className="mt-4 text-white">
                Whether you're a seasoned writer or a curious reader,
                Blogstagram is the place to express, discover, and connect.
              </p>
            </div>
          </div>

          <div className="lg:flex lg:flex-row sm:flex sm:flex-col lg:justify-around sm:justify-between pt-10">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">About Me</h2>
              <div className="flex flex-col items-center">
                <img
                  className="w-40 h-40 object-cover mb-4 rounded-full"
                  src="/replicate-prediction-j3xmz3jb6q5lmwfg2svnax5tyq.jpeg"
                  alt="Adarsh Jha"
                />
                <h3 className="text-2xl font-bold mb-2">Adarsh Jha</h3>
                <p className="text-white mb-4">Full Stack Developer</p>
              </div>
            </div>

            {/* Contact Me */}
            <div className="text-center flex flex-col justify-center">
              <h2 className="text-4xl font-bold mb-4">Contact Me</h2>
              <div className="flex justify-center lg:m-2 sm:ml-2 lg:space-x-12 sm:space-x-10">
                <a
                  href="https://www.instagram.com/adarsh_glimpse"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="text-4xl ml-1 mr-1 text-white hover:text-pink-500 cursor-pointer transition-colors duration-200 ease-in-out" />
                </a>
                <a
                  href="https://twitter.com/Adarsh_Jha_0410"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter className="text-4xl ml-1 mr-1 text-white hover:text-blue-500 cursor-pointer transition-colors duration-200 ease-in-out" />
                </a>
                <a
                  href="https://www.linkedin.com/in/adarsh-jha-311491254/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className="text-4xl ml-1 mr-1 text-white hover:text-blue-500 cursor-pointer transition-colors duration-200 ease-in-out" />
                </a>
                <a
                  href="https://github.com/adarsh-jha-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className="text-4xl ml-1 mr-1 text-white hover:text-black cursor-pointer transition-colors duration-200 ease-in-out" />
                </a>
                <a href="mailto:adarshjhaxif@gmail.com">
                  <FaEnvelope className="text-4xl ml-1 mr-1 text-white hover:text-yellow-500 cursor-pointer transition-colors duration-200 ease-in-out" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
