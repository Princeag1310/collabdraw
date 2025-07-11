"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  appName?: string;
  onClick?: () => void;
}

export const Button = ({ children, className = "", appName = "", onClick }: ButtonProps) => {
  return (
    <button
      className={`px-4 py-2 rounded-lg font-medium transition-transform duration-200 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
