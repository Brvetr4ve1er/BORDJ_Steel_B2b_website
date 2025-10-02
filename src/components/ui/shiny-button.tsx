"use client";

import React from 'react';

interface ShinyButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function ShinyButton({ children, onClick, className }: ShinyButtonProps) {
  return (
    <div className={`button-wrap ${className}`}>
      <button className="shiny-button" onClick={onClick}>
        <span>{children}</span>
      </button>
      <div className="button-shadow"></div>
    </div>
  );
}
