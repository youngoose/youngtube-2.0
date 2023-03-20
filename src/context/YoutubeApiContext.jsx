import { createContext, useContext } from 'react';
import Youtube from '../api/youtube';
import YoutubeClient from '../api/youtubeClient';

export const YoutubeApiContext = createContext();

export function YoutubeApiProvider({ children }) {
  const client = new YoutubeClient();
  const youtube = new Youtube(client);

  return (
    <YoutubeApiContext.Provider value={{ youtube }}>
      {children}
    </YoutubeApiContext.Provider>
  );
}

export const useYoutubeApi = () => useContext(YoutubeApiContext);
