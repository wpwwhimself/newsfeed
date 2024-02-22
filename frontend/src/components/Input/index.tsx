import { ChangeEventHandler, Dispatch, SetStateAction } from "react"
import "./style.css"

interface Props {
  type?: string,
  label: string,
  icon?: JSX.Element,
  value?: string | number,
  onChange: Dispatch<SetStateAction<string | undefined>>,
}

export const Input = ({type = "text", label, icon, value, onChange}: Props) => {
  return <div className="input-container flex-down tight">
    <label htmlFor="">{icon} {label}</label>
    <input type={type} value={value} onChange={(ev) => onChange(ev.currentTarget.value)} />
  </div>
}