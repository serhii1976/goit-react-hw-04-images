import axios from 'axios';

export let per_page;
export async function getImages(searchValue, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = 'key=29473371-b315f9acd1ced765f914602d8';
  per_page = 12;
  const searchSettings = 'image_type=photo&orientation=horizontal';

  const response = await axios.get(
    `${BASE_URL}?q=${searchValue}&page=${page}&${API_KEY}&${searchSettings}&per_page=${per_page}`
  );

  return response.data;
}
