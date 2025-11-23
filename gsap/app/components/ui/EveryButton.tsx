"use client";

import React, { useRef, useEffect } from "react";

type EveryButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
  children: React.ReactNode;
  className?: string;
};

const pushableStyle: React.CSSProperties = {
  background: "hsl(340deg 100% 32%)",
  borderRadius: 12,
  border: "none",
  padding: 0,
  cursor: "pointer",
  outlineOffset: "4px",
  position: "relative",
};

const frontStyle: React.CSSProperties = {
  display: "block",
  padding: "12px 42px",
  borderRadius: 12,
  fontSize: "1.25rem",
  background: "hsl(345deg 100% 47%)",
  color: "white",
  transform: "translateY(-6px)",
  transition: "transform 160ms var(--ease, cubic-bezier(.2,.9,.2,1))",
  position: "relative",
  zIndex: 1,
};

export function EveryButton({ href, children, className = "", onClick, ...rest }: EveryButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    // GSAP Hover Glow Animation
    const handleMouseEnter = () => {
      if (window.gsap) {
        window.gsap.to(button, {
          boxShadow: "0px 0px 20px #4cc9f0",
          duration: 0.3,
        });
      }
    };

    const handleMouseLeave = () => {
      if (window.gsap) {
        window.gsap.to(button, {
          boxShadow: "0px 0px 0px transparent",
          duration: 0.3,
        });
      }
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const content = (
    <span className={`everybutton-front ${className}`} style={frontStyle}>
      {children}
    </span>
  );

  if (href) {
    return (
      <a
        href={href}
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        className="everybutton-wrapper"
        style={pushableStyle}
      >
        {content}
        <style jsx>{`
          .everybutton-wrapper:active .everybutton-front { transform: translateY(-2px); }
        `}</style>
      </a>
    );
  }

  return (
    <button
      {...rest}
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      className="everybutton-wrapper"
      style={pushableStyle}
      onClick={onClick}
    >
      {content}
      <style jsx>{`
        .everybutton-wrapper:active .everybutton-front { transform: translateY(-2px); }
      `}</style>
    </button>
  );
}

export default EveryButton;
