import "./style.css"

interface Props {
  icon?: JSX.Element,
  label?: string,
  onClick: () => any,
  highlighted?: boolean,
}

export const Button = ({icon, label, onClick, highlighted = false}: Props) => {
  return <div className={[
    "button",
    "flex-right",
    "center",
    highlighted && "accent-border",
  ].filter(Boolean).join(" ")} onClick={onClick}>
    {icon}
    {label}
  </div>
}