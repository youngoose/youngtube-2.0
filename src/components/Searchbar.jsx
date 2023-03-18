import React, { useState } from 'react';
import { BsYoutube, BsSearch } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export default function Searchbar({ onSearch }) {
  const [text, setText] = useState('');
  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(text);
    setText('');
  };
  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <header className="w-full flex p-4 text-2xl border-b border-zinc-600 mb-4">
      <Link to={'/'} className="flex items-center">
        <button className="text-4xl text-brand">
          <BsYoutube />
        </button>
        <h1 className="ml-1 font-bold">YoungTube</h1>
      </Link>
      <form className="w-full flex justify-center" onSubmit={handleSearch}>
        <input
          className="w-7/12 p-2 border-none outline-none bg-black text-gray-50"
          type="text"
          placeholder=" Search..."
          onChange={handleChange}
          value={text}
        />
        <button className="bg-zinc-600 px-4">
          <BsSearch />
        </button>
      </form>
    </header>
  );
}
