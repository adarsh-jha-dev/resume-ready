import { useState } from "react"
import UserContext from "./userContext.jsx"

const UserState = (props) => {
  const [user, setUser] = useState(null)

  const login = (userdata) => {
    setUser(userdata)
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {props.children}
    </UserContext.Provider>
  )
}

export { UserState }
