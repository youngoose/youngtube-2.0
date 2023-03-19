import React from 'react';
import moment from 'moment';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function RelatedVideos({ videoId }) {
  const {
    isLoading,
    error,
    data: relatedContents,
  } = useQuery(
    ['relatedContents', videoId],
    async () => {
      return axios
        .create({
          baseURL: 'https://youtube.googleapis.com/youtube/v3',
          params: { key: process.env.REACT_APP_YOUTUBE_API_KEY },
        })
        .get('search', {
          params: {
            part: 'snippet',
            maxResults: 25,
            relatedToVideoId: videoId,
            type: 'video',
          },
        })
        .then((res) => {
          return res.data.items;
        });
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

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error!!</p>;

  return (
    <div className="mx-2">
      {relatedContents.map((item, index) => (
        <div key={index}>
          <button
            className="text-left"
            onClick={() =>
              handleVideoClick(
                item.id.videoId,
                item.snippet.title,
                item.snippet.description,
                item.snippet.channelTitle
              )
            }
          >
            <div className="grid grid-flow-col grid-cols-[1fr_1fr] lg:gap-2 md:gap-4 gap-3 lg:mt-0 md:mt-3 mt-1 lg:mb-2.5">
              <div>
                <img
                  className="rounded-xl object-cover"
                  src={item.snippet.thumbnails.high.url}
                  alt={item.snippet.title}
                />
              </div>

              <div>
                <p>{decodeHtml(item.snippet.title)}</p>
                <p className="text-gray-400 font-semibold">
                  {item.snippet.channelTitle}
                </p>
                <div className="mt-5 pb-1">
                  <span>{timeAgo(item.snippet.publishTime)}</span>
                </div>
              </div>
            </div>
          </button>
        </div>
      ))}
    </div>
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
