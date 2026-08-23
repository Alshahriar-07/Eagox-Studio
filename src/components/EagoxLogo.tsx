import React, { useState } from 'react';
import logoJpeg from '../assets/logo.jpeg';
import iconJpeg from '../assets/icon.jpeg';

interface EagoxLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon' | 'text' | 'image';
  className?: string;
  dark?: boolean;
}

export const EagoxIcon: React.FC<{ size?: number; className?: string; color?: string; preferImage?: boolean }> = ({
  size = 40,
  className = '',
  color = 'currentColor',
  preferImage = false,
}) => {
  const [imageError, setImageError] = useState(false);

  if (preferImage && !imageError) {
    return (
      <img
        src={iconJpeg}
        alt="Eagox Studio Icon"
        width={size}
        height={size}
        onError={() => setImageError(true)}
        className={`rounded-xl object-contain shrink-0 shadow-xs ${className}`}
        style={{ width: `${size}px`, height: `${size}px` }}
      />
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      id="eagox-hex-circuit-icon"
    >
      {/* Outer Hexagon with thick rounded border */}
      <path
        d="M 50,5 
           L 92,27.5 
           L 92,72.5 
           L 50,95 
           L 8,72.5 
           L 8,27.5 
           Z"
        stroke={color}
        strokeWidth="9.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Lower-left rounded square */}
      <rect
        x="21"
        y="51"
        width="24"
        height="24"
        rx="5"
        fill="none"
        stroke={color}
        strokeWidth="7"
      />
      {/* Top branch line from square to filled circle */}
      <path
        d="M 33,51 
           L 33,36 
           Q 33,32 37,32 
           L 62,32"
        stroke={color}
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Top right circular node */}
      <circle cx="65" cy="32" r="10" fill={color} />
      {/* Bottom branch line going right and down */}
      <path
        d="M 45,63 
           L 67,63 
           Q 71,63 71,67 
           L 71,80"
        stroke={color}
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const EagoxWordmark: React.FC<{
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  color?: string;
}> = ({ size = 'md', className = '', color = 'currentColor' }) => {
  const sizeClasses = {
    sm: 'text-lg tracking-[0.2em] font-light',
    md: 'text-2xl tracking-[0.22em] font-light',
    lg: 'text-4xl tracking-[0.25em] font-light',
    xl: 'text-6xl tracking-[0.28em] font-light',
  };

  return (
    <div
      className={`inline-flex items-center font-sans uppercase select-none ${sizeClasses[size]} ${className}`}
      style={{ color, fontFamily: 'system-ui, -apple-system, sans-serif' }}
      id="eagox-wordmark"
    >
      <span className="font-extralight">E</span>
      <span className="font-light ml-1">A</span>
      {/* Custom stylized G with square node */}
      <span className="relative inline-flex items-center justify-center ml-1">
        <span className="font-light">G</span>
        <span
          className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border border-current bg-transparent pointer-events-none"
          style={{ transform: 'translate(10%, -10%)' }}
        />
      </span>
      <span className="font-light ml-1">O</span>
      <span className="font-light ml-1">X</span>
    </div>
  );
};

export const EagoxLogo: React.FC<EagoxLogoProps> = ({
  size = 'md',
  variant = 'full',
  className = '',
  dark,
}) => {
  const iconSizes = {
    sm: 28,
    md: 36,
    lg: 48,
    xl: 64,
  };

  const defaultColorClass = dark === true ? 'text-white' : dark === false ? 'text-zinc-950' : 'text-zinc-950 dark:text-white';

  if (variant === 'image') {
    return (
      <img
        src={logoJpeg}
        alt="Eagox Studio Logo"
        className={`object-contain rounded-xl shadow-xs ${className}`}
        style={{ width: `${iconSizes[size] * 3}px` }}
      />
    );
  }

  if (variant === 'icon') {
    return <EagoxIcon size={iconSizes[size]} color="currentColor" className={`${defaultColorClass} ${className}`} />;
  }

  if (variant === 'text') {
    return <EagoxWordmark size={size} color="currentColor" className={`${defaultColorClass} ${className}`} />;
  }

  return (
    <div className={`inline-flex items-center gap-3 ${defaultColorClass} ${className}`} id="eagox-full-logo">
      <EagoxIcon size={iconSizes[size]} color="currentColor" />
      <div className="flex flex-col">
        <EagoxWordmark size={size} color="currentColor" />
        <span className="text-[9px] tracking-[0.3em] uppercase text-zinc-500 dark:text-zinc-400 font-mono -mt-0.5 font-semibold">
          STUDIO
        </span>
      </div>
    </div>
  );
};

