import React from 'react';

export function HomeLogo({ className = 'w-9 h-9' }: { className?: string }) {
  return (
    <div
      className={`${className} rounded-2xl bg-gradient-to-br from-sage-600 to-sage-700 flex items-center justify-center text-white shadow-soft transition-transform group-hover:scale-105 p-1.5`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Cozy Roof with chimney */}
        <path
          d="M18 7V4H15V5.5"
          stroke="#FDE68A"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3 10.5L12 3L21 10.5"
          stroke="#FAF6EE"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* House Body */}
        <path
          d="M5 9.5V19C5 19.8284 5.67157 20.5 6.5 20.5H17.5C18.3284 20.5 19 19.8284 19 19V9.5"
          stroke="#FAF6EE"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Cozy Arch Doorway with heart */}
        <path
          d="M10 20.5V14.5C10 13.3954 10.8954 12.5 12 12.5C13.1046 12.5 14 13.3954 14 14.5V20.5"
          stroke="#F6D1C6"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle cx="12" cy="8" r="1.3" fill="#FDE68A" />
      </svg>
    </div>
  );
}
