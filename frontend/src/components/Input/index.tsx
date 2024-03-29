import { Dispatch, SetStateAction } from "react"
import "./style.css"

interface Props {
  type?: string,
  name?: string,
  label: string,
  icon?: JSX.Element,
  value?: string | number,
  onChange: Dispatch<SetStateAction<string | undefined>>,
  focus?: boolean,
  min?: string,
  max?: string,
}

export const Input = ({type = "text", name, label, icon, value, onChange, focus, min, max}: Props) => {
  return <div className="input-container flex-down tight">
    <label htmlFor={name} className="ghost">{icon} {label}</label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={(ev) => onChange(ev.currentTarget.value)}
      autoFocus={focus}
      min={min}
      max={max}
    />
  </div>
}