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
  const max_font_size = 28
  const font_scale_factor = 6

  return <Pill>
    <div className="top-header flex-right">
      <span className="title flex-right" style={{ fontSize: max_font_size - font_scale_factor * (level - 1) }}>
        {icon}
        <span>{label}</span>
      </span>

      <div className="buttons flex-right center">
        {buttons}
      </div>
    </div>
  </Pill>
}