import React from 'react';
import { useYoutubeApi } from '../context/YoutubeApiContext';
import { useQuery } from '@tanstack/react-query';

export default function ChannelInfo({ id, title }) {
  const { youtube } = useYoutubeApi();
  const { data: url } = useQuery(
    ['url', id],
    () => youtube.getChannelImgUrl(id),
    { staleTime: 1000 * 60 * 5 }
  );

  return (
    <div className="flex items-center pt-4">
      <img className="w-8 h-8 rounded-full" src={url} alt={title} />
      <p className="ml-2 text-gray-400 font-semibold">{title}</p>
    </div>
  );
}
