import React, { useState } from 'react';
import { AiFillYoutube } from 'react-icons/ai';
import { GoSearch } from 'react-icons/go';
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
    <header className="grid grid-flow-col lg:grid-cols-8 md:grid-cols-4 sm:w-11/12 md:mt-5 lg:mb-2 md:mx-7 mt-3 mx-[20px]">
      <Link to={'/'}>
        <div className="flex">
          <button className="text-3xl text-red-600">
            <AiFillYoutube />
          </button>
          <span className="ml-1 font-bold">YoungTube</span>
        </div>
      </Link>
      <form className="flex w-48" onSubmit={handleSearch}>
        <input
          className="rounded-l-md border-none outline-none text-black z-0 border-r-0"
          type="text"
          placeholder=" Search"
          onChange={handleChange}
          value={text}
        />
        <button className="hover:bg-gray-600 border border-gray-600 rounded-r-md cursor-pointer -ml-0.5 border-l-0">
          <GoSearch className="mx-2" />
        </button>
      </form>
    </header>
  );
}
