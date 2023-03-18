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
      <Outlet context={keyword} />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}
