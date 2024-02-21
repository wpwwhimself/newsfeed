import "./style.css"

interface Props {
  children: any,
}

export const Pill = ({children}: Props) => {
  return <div className="pill">
    {children}
  </div>
}