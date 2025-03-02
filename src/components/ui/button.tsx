import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: ReactNode; // ✅ Ensures `children` is recognized
}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button className={`your-button-styles ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
