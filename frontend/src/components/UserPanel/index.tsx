import { useEffect, useState } from "react"
import "./style.css"
import { LoginMode, NotificationProps, PreferencesSettersDict } from "../../types"
import { Input } from "../Input"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAnglesRight, faBullhorn, faEnvelope, faFolderTree, faIdCard, faKey, faPowerOff, faRightToBracket, faStar, faUserPen } from "@fortawesome/free-solid-svg-icons"
import { Button } from "../Button"
import { Hourglass } from "../Hourglass"
import { rqGet, rqPost } from "../../helpers/fetch"
import { Notification } from "../Notification"
import { MultiInput } from "../MultiInput"

export const UserPanel = () => {
  const [mode, setMode] = useState<LoginMode>()

  const [login, setLogin] = useState<string>()
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()

  const [sources, setSources] = useState<string[]>()
  const [categories, setCategories] = useState<string[]>()
  const [authors, setAuthors] = useState<string[]>()

  const [loaderVisible, setLoaderVisible] = useState(true)
  const [notifications, setNotifications] = useState<NotificationProps>()

  const changeLoginMode = (new_mode: LoginMode) => {
    setNotifications(undefined)
    setMode(new_mode)
  }

  const prepareForRequest = () => {
    setLoaderVisible(true)
    setNotifications(undefined)
  }

  const submitForm = () => {
    prepareForRequest()

    rqPost(mode!, {
      name: login,
      email: email,
      password: password,
    }).then(res => {
      setNotifications({ mode: "success", content: res.data.message })
      if (mode === "login") prepareForAuth()
    }).catch(err => {
      setNotifications({ mode: "error", content: err.response.data.message })
    }).finally(() => {
      setLoaderVisible(false)
    })
  }

  const logoutUser = () => {
    prepareForRequest()

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
    prepareForRequest()

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

  const updatePreferences = (value: string[], type: number) => {
    prepareForRequest()
    let success = false;

    const setPreference: PreferencesSettersDict = {
      1: setSources,
      2: setCategories,
      3: setAuthors,
    }

    rqPost("preference/update", {
      type: type,
      preferences: value,
    }).then(res => {
      setNotifications({ mode: "success", content: res.data.message })
      setPreference[type](value)
      success = true
    }).catch(err => {
      setNotifications({ mode: "error", content: err.response.data.message })
    }).finally(() => {
      setLoaderVisible(false)
    })

    return success;
  }

  useEffect(() => {
    prepareForAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div className="user-panel flex-down">
    {["guest", "login", "register"].includes(mode!) && <>
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

      {mode !== "guest" && <div className="inputs flex-down">
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
    }

    {mode === "authed" && <>
      <span className="title level-2">Browsing as: {login}</span>

      <div className="inputs flex-down">
        <MultiInput
          icon={<FontAwesomeIcon icon={faBullhorn} />}
          label="Preferred sources"
          value={sources}
          onChange={(val) => updatePreferences(val, 1)}
        />
        <MultiInput
          icon={<FontAwesomeIcon icon={faFolderTree} />}
          label="Preferred categories"
          value={categories}
          onChange={(val) => updatePreferences(val, 2)}
        />
        <MultiInput
          icon={<FontAwesomeIcon icon={faUserPen} />}
          label="Preferred authors"
          value={authors}
          onChange={(val) => updatePreferences(val, 3)}
        />

        <Button
          icon={<FontAwesomeIcon icon={faPowerOff} />}
          label="Logout"
          onClick={logoutUser}
        />
      </div>
    </>}

    {loaderVisible && <Hourglass />}
    {notifications && <Notification notification={notifications} />}
  </div>
}