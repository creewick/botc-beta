import './Button.css'

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
}

export default function Button({ children, onClick, href, className, disabled }: ButtonProps) {
  if (disabled) return (
    <a className={className}>
      {children}
    </a>
  );
  
  return (
    <a className={`button ${className}`} onClick={onClick} href={href}>
      {children}
    </a>
  )
}