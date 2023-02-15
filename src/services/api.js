import axios from 'axios';

export const pixabayApi = async (query, pageToFind) => {
  const { data } = await axios.get(`https://pixabay.com/api/`, {
    params: {
      image_type: 'photo',
      safesearch: 'true',
      orientation: 'horizontal',
      page: pageToFind,
      q: query,
      per_page: 12,
      key: '32848509-cba45cf412629684caa169d48',
    },
  });
  return data;
};
