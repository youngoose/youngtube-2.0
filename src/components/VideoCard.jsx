import React from 'react';
import { useNavigate } from 'react-router-dom';
import decodeHtml from '../util/decodeHtml';
import { formatAgo } from '../util/date';
import ChannelInfo from './ChannelInfo';

export default function VideoCard({ video, type }) {
  const navigate = useNavigate();
  const { title, thumbnails, channelId, channelTitle, publishedAt } =
    video.snippet;
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
        <p className="font-bold hover:text-gray-400">{decodeHtml(title)}</p>
        <ChannelInfo id={channelId} title={channelTitle} />
        <p className="pt-4 text-sm">{formatAgo(publishedAt)}</p>
      </div>
    </li>
  );
}
