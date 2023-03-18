import React from 'react';
import moment from 'moment';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useOutletContext } from 'react-router-dom';
import Card from '../components/Card';
import axios from 'axios';

export default function Videos() {
  const keyword = useOutletContext();

  const {
    isLoading,
    error,
    data: contents,
  } = useQuery(
    ['contents', keyword],
    async () => {
      return keyword ? search() : mostPopular();
    },
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

  const search = () => {
    return axios
      .create({
        baseURL: 'https://youtube.googleapis.com/youtube/v3',
        params: { key: process.env.REACT_APP_YOUTUBE_API_KEY },
      })
      .get('search', {
        params: {
          part: 'snippet',
          maxResults: 25,
          q: keyword,
        },
      })
      .then((res) => {
        return res.data.items;
      });
  };

  const mostPopular = () => {
    return axios
      .create({
        baseURL: 'https://youtube.googleapis.com/youtube/v3',
        params: { key: process.env.REACT_APP_YOUTUBE_API_KEY },
      })
      .get('videos', {
        params: {
          part: 'snippet',
          chart: 'mostPopular',
          maxResults: 25,
        },
      })
      .then((res) => {
        return res.data.items;
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
                keyword ? item.id.videoId : item.id,
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
          <p className="pl-1 pb-4">{item.snippet.channelTitle}</p>
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
