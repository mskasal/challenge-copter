import { ButtonHTMLAttributes, FC, SVGProps } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

interface IconButtonProps extends ButtonProps {
  icon: FC<SVGProps<SVGSVGElement>>;
}

function IconButton({ icon: Icon, onClick }: IconButtonProps): JSX.Element {
  return (
    <button
      className="btn icon-btn"
      onClick={onClick}
      aria-label={Icon.defaultProps?.["aria-label"]}
    >
      <Icon />
    </button>
  );
}

function FlatButton({ onClick, text }: ButtonProps): JSX.Element {
  return <button className="btn icon-btn" onClick={onClick}>{text}</button>;
}

export { FlatButton, IconButton };