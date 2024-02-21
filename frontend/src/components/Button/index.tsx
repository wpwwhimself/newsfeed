import "./style.css"

interface Props {
  icon?: JSX.Element,
  label?: string,
  onClick: () => any;
}

export const Button = ({icon, label, onClick}: Props) => {
  return <div className="button flex-right center" onClick={onClick}>
    {icon}
    {label}
  </div>
}