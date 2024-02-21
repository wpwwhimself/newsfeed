import { ReactElement } from "react"
import { Pill } from "../Pill"
import "./style.css"

interface Props {
  level: 1 | 2 | 3,
  label?: string,
  buttons?: ReactElement,
  icon?: JSX.Element,
}

export const TopHeader = ({level, label, buttons, icon}: Props) => {
  return <Pill>
    <div className="top-header flex-right">
      <span className={`title level-${level} flex-right`}>
        {icon}
        <span>{label}</span>
      </span>

      <div className="buttons flex-right center">
        {buttons}
      </div>
    </div>
  </Pill>
}