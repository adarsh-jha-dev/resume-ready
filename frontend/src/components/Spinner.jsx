import React from "react"

const Spinner = ({ message, textColor = "white" }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="animate-spin rounded-full border-t-4 border-green-500 border-solid h-16 w-16 mb-4"></div>
      <p
        className={`text-${
          textColor === "black" || textColor === "white"
            ? textColor
            : textColor + "-500"
        } text-center`}
      >
        {message}
      </p>
    </div>
  )
}

export default Spinner
