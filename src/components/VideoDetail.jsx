import React, { useLayoutEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import RelatedVideos from './RelatedVideos';
import ChannelInfo from './ChannelInfo';

export default function VideoDetail() {
  const { videoId } = useParams();
  const {
    state: { video },
  } = useLocation();
  const { title, description, channelId, channelTitle } = video.snippet;
  const videoURL = `https://www.youtube.com/embed/${videoId}`;

  const Wrapper = ({ children }) => {
    const location = useLocation();
    useLayoutEffect(() => {
      document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);
    return children;
  };

  return (
    <Wrapper>
      <div className="flex flex-col lg:flex-row mt-3">
        <div className="basis-4/6">
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              id="player"
              type="text/html"
              src={videoURL}
              title={title}
            ></iframe>
          </div>

          <div className="p-8">
            <p className="text-xl font-bold">{title}</p>
            <ChannelInfo id={channelId} title={channelTitle} />
            <pre className="break-words mt-8 whitespace-pre-wrap">
              {description}
            </pre>
          </div>
        </div>

        <div className="basis-2/6">
          <RelatedVideos id={videoId} />
        </div>
      </div>
    </Wrapper>
  );
}
