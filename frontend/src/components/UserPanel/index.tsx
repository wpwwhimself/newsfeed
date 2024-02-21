import { useState } from "react"
import "./style.css"
import { LoginMode } from "../../types"
import { Input } from "../Input"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAnglesRight, faIdCard, faKey, faRightToBracket, faStar } from "@fortawesome/free-solid-svg-icons"
import { Button } from "../Button"

export const UserPanel = () => {
  const [mode, setMode] = useState<LoginMode>("guest")
  const [login, setLogin] = useState<string>()
  const [password, setPassword] = useState<string>()

  const changeLoginMode = (new_mode: LoginMode) => setMode(new_mode)

  const submitForm = () => {

  }

  return <div className="user-panel">
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
  </div>
}