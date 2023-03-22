import React, { useLayoutEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import RelatedVideos from './RelatedVideos';

export default function VideoDetail() {
  const { videoId } = useParams();
  const location = useLocation();
  const videoURL = `https://www.youtube.com/embed/${videoId}`;
  const { title, description, channelTitle } = location.state;

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
            <p className="text-lg font-semibold text-gray-400">
              {channelTitle}
            </p>
            <pre className="mt-8 whitespace-pre-wrap">{description}</pre>
          </div>
        </div>

        <div className="basis-2/6">
          <RelatedVideos videoId={videoId} />
        </div>
      </div>
    </Wrapper>
  );
}
