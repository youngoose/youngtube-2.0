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
      <div className="grid xl:grid-cols-[4.8fr_1.5fr] md:mx-[2.5rem] mx-[1.1rem] md:mt-5 mt-2">
        <div>
          <div className="basis-4/6">
            <iframe
              id="player"
              type="text/html"
              width="100%"
              height="640"
              src={videoURL}
              title={title}
            ></iframe>
          </div>

          <div className="max-w-8xl md:mt-3 mt-2">
            <p className="md:text-xl text-lg font-bold">{title}</p>

            <p className="text-md md:mt-1 mt-1 font-semibold text-gray-400">
              {channelTitle}
            </p>

            <div className="md:mt-2 mt-2 pl-5 pb-5 shadow-lg rounded-lg bg-zinc-800">
              <pre className="text-sm -ml-2 pt-3 -mb-1 font-semibold">
                {description}
              </pre>
            </div>
          </div>
        </div>
        <div>
          <RelatedVideos videoId={videoId} />
        </div>
      </div>
    </Wrapper>
  );
}
