"use client";

import { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  appName?: string;
}

export const Button = ({ children, className = "", appName = "", ...props }: ButtonProps) => {
  return (
    <button
      className={`px-4 py-2 rounded-lg font-medium transition-transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
