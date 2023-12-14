import React, { createContext, useContext, useState } from "react"
import Alert from "../components/Alert/Alert"

const AlertContext = createContext()

export const useAlert = () => {
  const context = useContext(AlertContext)
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider")
  }
  return context
}

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([])

  const showAlert = (message, type, duration = 3000) => {
    const alert = {
      id: Date.now(),
      message,
      type,
      onClose: () => closeAlert(alert.id),
    }

    setAlerts((prevAlerts) => [...prevAlerts, alert])

    setTimeout(() => {
      closeAlert(alert.id)
    }, duration)
  }

  const closeAlert = (id) => {
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id))
  }

  return (
    <AlertContext.Provider value={showAlert}>
      {children}
      <div className="alert-container">
        {alerts.map((alert) => (
          <Alert
            key={alert.id}
            message={alert.message}
            type={alert.type}
            onClose={alert.onClose}
          />
        ))}
      </div>
    </AlertContext.Provider>
  )
}
