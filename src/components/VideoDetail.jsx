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
          <iframe
            id="player"
            type="text/html"
            width="100%"
            height="640"
            src={videoURL}
            title={title}
          ></iframe>

          <div className="p-8">
            <p className="font-bold">{title}</p>

            <p className="text-md ont-semibold text-gray-400">{channelTitle}</p>

            <div className="mt-2 pl-5 pb-5 shadow-lg rounded-lg bg-zinc-800">
              <pre className="text-sm -ml-2 pt-3 -mb-1 font-semibold">
                {description}
              </pre>
            </div>
          </div>
        </div>

        <div className="basis-2/6">
          <RelatedVideos videoId={videoId} />
        </div>
      </div>
    </Wrapper>
  );
}
