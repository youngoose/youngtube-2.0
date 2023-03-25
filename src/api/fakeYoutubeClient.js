import axios from 'axios';

export default class FakeYoutubeClient {
  async search({ params }) {
    return axios.get(
      `/videos/${params.relatedToVideoId ? 'related' : 'search'}.json`
    );
  }

  async videos() {
    return axios.get('/videos/popular.json');
  }
}
