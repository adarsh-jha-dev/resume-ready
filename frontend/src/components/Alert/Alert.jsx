import React, { useState, useEffect } from "react"
import { AiOutlineClose } from "react-icons/ai"

const Alert = ({ message, type, onClose }) => {
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => Math.max(0, prev - 100 / (3000 / 100)))
    }, 100)

    return () => {
      clearInterval(timer)
    }
  }, [])

  const handleAlertClose = () => {
    clearInterval(progress)
    onClose()
  }

  return (
    <div className={`toast ${type}`}>
      <div className="toast-status-icon">
        <svg>
          <use xlinkHref={`#${type}ToastIcon`} />
        </svg>
      </div>
      <div className="toast-content">
        <span>{type}</span>
        <p>{message}</p>
      </div>
      <button className="toast-close" onClick={handleAlertClose}>
        <AiOutlineClose />
      </button>
      <div className="toast-duration" style={{ width: `${progress}%` }}></div>
    </div>
  )
}

export default Alert
