import React from 'react';
import { useNavigate } from 'react-router-dom';
import decodeHtml from '../util/decodeHtml';
import { formatAgo } from '../util/date';

export default function VideoCard({ video, type }) {
  const navigate = useNavigate();
  const { title, thumbnails, channelTitle, publishedAt } = video.snippet;
  const isList = type === 'list';

  return (
    <li
      className={isList ? 'flex gap-1 mx-2 mb-3' : ''}
      onClick={() =>
        navigate(`/videos/${video.id}`, {
          state: { video },
        })
      }
    >
      <img
        className={isList ? 'rounded-lg w-60 mr-1' : 'rounded-lg w-full'}
        src={thumbnails.high.url}
        alt={title}
      />
      <div className={isList ? '' : 'my-2'}>
        <p className="font-bold mb-2 hover:text-gray-400">
          {decodeHtml(title)}
        </p>
        <p className="pb-4 text-gray-400 font-semibold text-sm">
          {channelTitle}
        </p>
        <p className="text-sm">{formatAgo(publishedAt)}</p>
      </div>
    </li>
  );
}
