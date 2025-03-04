import React from 'react';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

const Logo: React.FC<LogoProps> = ({ className = '', width = 32, height = 32 }) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Brain circuit background */}
      <path
        d="M16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4Z"
        stroke="url(#gradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="2 3"
      >
        <animate attributeName="strokeDashoffset" values="12;0" dur="3s" repeatCount="indefinite"/>
      </path>

      {/* Neural network nodes */}
      <circle cx="16" cy="12" r="2" fill="url(#gradient)">
        <animate attributeName="r" values="1.5;2;1.5" dur="2s" repeatCount="indefinite"/>
      </circle>
      <circle cx="12" cy="18" r="2" fill="url(#gradient)">
        <animate attributeName="r" values="1.5;2;1.5" dur="2s" repeatCount="indefinite" begin="0.5s"/>
      </circle>
      <circle cx="20" cy="18" r="2" fill="url(#gradient)">
        <animate attributeName="r" values="1.5;2;1.5" dur="2s" repeatCount="indefinite" begin="1s"/>
      </circle>

      {/* Neural connections */}
      <path d="M16 12L12 18" stroke="url(#gradient)" strokeWidth="1.5">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite"/>
      </path>
      <path d="M16 12L20 18" stroke="url(#gradient)" strokeWidth="1.5">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" begin="0.5s"/>
      </path>
      <path d="M12 18L20 18" stroke="url(#gradient)" strokeWidth="1.5">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" begin="1s"/>
      </path>

      {/* Pulse effect */}
      <circle cx="16" cy="16" r="6" stroke="url(#gradient)" strokeWidth="1" opacity="0.3">
        <animate attributeName="r" values="6;12;6" dur="3s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite"/>
      </circle>

      {/* Define gradient */}
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor: '#000000'}} />
          <stop offset="100%" style={{stopColor: '#333333'}} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Logo; 