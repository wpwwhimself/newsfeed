import { useEffect, useState } from "react"
import "./style.css"
import { LoginMode, NotificationProps } from "../../types"
import { Input } from "../Input"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAnglesRight, faEnvelope, faIdCard, faKey, faPowerOff, faRightToBracket, faStar } from "@fortawesome/free-solid-svg-icons"
import { Button } from "../Button"
import { Hourglass } from "../Hourglass"
import { rqGet, rqPost } from "../../helpers/fetch"
import { Notification } from "../Notification"

export const UserPanel = () => {
  const [mode, setMode] = useState<LoginMode>("guest")
  const [login, setLogin] = useState<string>()
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [loaderVisible, setLoaderVisible] = useState(true)
  const [notifications, setNotifications] = useState<NotificationProps>()

  const changeLoginMode = (new_mode: LoginMode) => {
    setNotifications(undefined)
    setMode(new_mode)
  }

  const submitForm = () => {
    setLoaderVisible(true)
    setNotifications(undefined)

    rqPost(mode, {
      name: login,
      email: email,
      password: password,
    }).then(res => {
      setNotifications({ mode: "success", content: res.data.message })
      prepareForAuth()
    }).catch(err => {
      setNotifications({ mode: "error", content: err.response.data.message })
    }).finally(() => {
      setLoaderVisible(false)
    })
  }

  const logoutUser = () => {
    setLoaderVisible(true)
    setNotifications(undefined)

    rqPost("logout")
      .then(res => {
        setNotifications({ mode: "success", content: res.data.message })
        prepareForAuth()
      }).catch(err => {
        setNotifications({ mode: "error", content: err.response.data.message })
      }).finally(() => {
        setLoaderVisible(false)
      })
  }

  const prepareForAuth = () => {
    setLoaderVisible(true)
    rqGet("me").then(res => {
      if (res.data === "") {
        setMode("guest")
      } else {
        setMode("authed")
        setLogin(res.data.name)
        setEmail(res.data.email)
      }
    }).finally(() => {
      setLoaderVisible(false)
    })
  }

  useEffect(() => {
    prepareForAuth()
  }, [])

  return <div className="user-panel">
    {loaderVisible ? <Hourglass /> : <div>
      <div className="flex-down">
        {mode !== "authed"
        ? <>
          <span className="title level-2">You are currently not logged in</span>

          <div className="flex-right center">
            <Button
              icon={<FontAwesomeIcon icon={faRightToBracket} />}
              label="Login"
              onClick={() => changeLoginMode("login")}
              highlighted={mode === "login"}
            />
            <Button
              icon={<FontAwesomeIcon icon={faStar} />}
              label="Register"
              onClick={() => changeLoginMode("register")}
              highlighted={mode === "register"}
            />
          </div>

          {["login", "register"].includes(mode) && <div className="inputs flex-down">
            <Input name="username"
              icon={<FontAwesomeIcon icon={faIdCard} />}
              label="Username"
              onChange={setLogin}
            />
            {mode === "register" &&
              <Input
                type="email"
                icon={<FontAwesomeIcon icon={faEnvelope} />}
                label="Email"
                onChange={setEmail}
              />}
            <Input
              type="password"
              icon={<FontAwesomeIcon icon={faKey} />}
              label="Password"
              onChange={setPassword}
            />
            <Button
              icon={<FontAwesomeIcon icon={faAnglesRight} />}
              label="Proceed"
              onClick={submitForm}
            />
          </div>}
        </>
        : <>
          <span className="title level-2">Browsing as: {login}</span>

          <div className="inputs flex-down">
            <Button
              icon={<FontAwesomeIcon icon={faPowerOff} />}
              label="Logout"
              onClick={logoutUser}
            />
          </div>
        </>}

        {notifications && <Notification notification={notifications} />}
      </div>
    </div>}
  </div>
}