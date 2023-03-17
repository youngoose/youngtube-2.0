import React from 'react';

export default function Card({ children }) {
  return (
    <div className="md:mt-5 md:mx-7 mt-3 mx-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 overflow-hidden shadow-lg">
      {children}
    </div>
  );
}
