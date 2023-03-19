import React from 'react';

export default function Card({ children }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 gap-y-4 mt-3 mx-2 lg:mx-0">
      {children}
    </div>
  );
}
