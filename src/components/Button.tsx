import './Button.css'

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
}

export default function Button({ children, onClick, href }: ButtonProps) {
  return (
    <a className="button" onClick={onClick} href={href}>
      {children}
    </a>
  )
}