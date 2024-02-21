interface Props {
  icon?: string,
  label?: string,
  onClick: () => any;
}

export const Button = ({icon, label, onClick}: Props) => {
  return <button>
    {label}
  </button>
}