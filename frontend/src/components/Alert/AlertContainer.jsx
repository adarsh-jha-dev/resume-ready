import React, { useState } from "react"
import Alert from "./Alert"

const AlertContainer = () => {
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
  )
}

export default AlertContainer
