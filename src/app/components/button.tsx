import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={`inline-flex items-center justify-center rounded-full text-base font-semibold shadow-md ring-offset-background transition-all duration-200 transition-[border] duration-[1ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none border h-12 px-6 py-3
      bg-primary text-primary border-primary
      dark:bg-primary dark:text-white dark:border-white
      hover:text-[#1e3a8a] hover:border-[#1e3a8a] hover:border-2 hover:font-bold
      dark:hover:bg-accent dark:hover:text-[#fbbf24] dark:hover:border-[#fbbf24] dark:hover:border-2 dark:hover:font-bold
      ${className || ""}`}
    {...props}
  />
));
Button.displayName = "Button";
export { Button }; 