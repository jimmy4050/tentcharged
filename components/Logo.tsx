import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 230 50"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M 10 45 L 30 10 L 50 45 Z M 30 10 L 30 45"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <text
        x="60"
        y="38"
        fontFamily="Inter, sans-serif"
        fontSize="30"
        fontWeight="900"
        fill="currentColor"
        letterSpacing="-0.5"
      >
        TentCharged
      </text>
    </svg>
  );
};

export default Logo;
