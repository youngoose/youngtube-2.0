import React, { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import Searchbar from '../components/Searchbar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

export default function Root() {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const handleSearch = (text) => {
    navigate('/');
    setKeyword(text);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Searchbar onSearch={handleSearch} />
      <hr className="w-11/12 mx-auto h-px md:mt-5 mt-3 bg-gray-500 border-0 dark:bg-gray-700" />
      <Outlet context={keyword} />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}
