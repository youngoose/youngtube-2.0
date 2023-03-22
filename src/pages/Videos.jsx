import React from 'react';
import moment from 'moment';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useOutletContext } from 'react-router-dom';
import Card from '../components/Card';
import { useYoutubeApi } from '../context/YoutubeApiContext';

export default function Videos() {
  const keyword = useOutletContext();
  const { youtube } = useYoutubeApi();

  const {
    isLoading,
    error,
    data: contents,
  } = useQuery(
    ['contents', keyword],
    () => youtube.search(keyword),
    // prevent refetching for 5 mins
    { staleTime: 1000 * 60 * 5 }
  );

  const navigate = useNavigate();
  const handleVideoClick = (videoId, title, description, channelTitle) => {
    navigate(`/videos/${videoId}`, {
      state: {
        title: decodeHtml(title),
        description: decodeHtml(description),
        channelTitle: decodeHtml(channelTitle),
      },
    });
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error!!</p>;

  return (
    <Card>
      {contents.map((item, index) => (
        <div key={index}>
          <button
            className="text-left"
            onClick={() =>
              handleVideoClick(
                item.id,
                item.snippet.title,
                item.snippet.description,
                item.snippet.channelTitle
              )
            }
          >
            <img
              className="w-full rounded-lg"
              src={item.snippet.thumbnails.high.url}
              alt={item.snippet.title}
            />
            <div className="pl-1 pt-4">
              <div className="font-bold text-md mb-2 hover:text-gray-400">
                {decodeHtml(item.snippet.title)}
              </div>
            </div>
          </button>
          <p className="pl-1 pb-4 text-gray-400 font-semibold">
            {item.snippet.channelTitle}
          </p>
          <div className="pl-1 pb-2">
            <span>{timeAgo(item.snippet.publishTime)}</span>
          </div>
        </div>
      ))}
    </Card>
  );
}

const timeAgo = (time) => {
  return moment(time).fromNow();
};

const decodeHtml = (html) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};
