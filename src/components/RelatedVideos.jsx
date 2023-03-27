import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useYoutubeApi } from '../context/YoutubeApiContext';
import VideoCard from './VideoCard';

export default function RelatedVideos({ id }) {
  const { youtube } = useYoutubeApi();

  const {
    isLoading,
    error,
    data: videos,
  } = useQuery(
    ['videos', id],
    async () => youtube.relatedVideos(id),
    // prevent refetching for 5 mins
    { staleTime: 1000 * 60 * 5 }
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error!!</p>;

  return (
    <>
      {videos &&
        videos.map((video) => (
          <VideoCard video={video} key={video.id} type={'list'} />
        ))}
    </>
  );
}
