import './Button.css'

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}

export default function Button({ children, onClick, href, className }: ButtonProps) {
  return (
    <a className={`button ${className}`} onClick={onClick} href={href}>
      {children}
    </a>
  )
}