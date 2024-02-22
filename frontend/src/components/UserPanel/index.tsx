import { useEffect, useState } from "react"
import "./style.css"
import { LoginMode } from "../../types"
import { Input } from "../Input"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAnglesRight, faEnvelope, faIdCard, faKey, faRightToBracket, faStar } from "@fortawesome/free-solid-svg-icons"
import { Button } from "../Button"
import { Hourglass } from "../Hourglass"
import { rqGet, rqPost } from "../../helpers/fetch"

export const UserPanel = () => {
  const [mode, setMode] = useState<LoginMode>("guest")
  const [login, setLogin] = useState<string>()
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [loaderVisible, setLoaderVisible] = useState(true)

  const changeLoginMode = (new_mode: LoginMode) => setMode(new_mode)

  const submitForm = () => {
    setLoaderVisible(true)
    rqPost(mode, {
      name: login,
      email: email,
      password: password,
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.error(err)
    }).finally(() => {
      setLoaderVisible(false)
    })
  }

  useEffect(() => {
    // am I logged in?
    setLoaderVisible(true)
    rqGet("me").then(res => {
      setMode(res.data === "" ? "guest" : "authed")
    }).finally(() => {
      setLoaderVisible(false)
    })
  }, [])

  return <div className="user-panel">
    {loaderVisible ? <Hourglass /> : <>
      {mode !== "authed" && <div className="flex-down">
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
          <Input
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
      </div>}
    </>}
  </div>
}