'use strict';
import axios from 'axios';

const API_KEY = '46835246-fc67a7cc3b6e50b199f619e07';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1, perPage = 15) {
  try {
    const result = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: page,
        per_page: perPage,
      },
    });
    return result.data;
  } catch (error) {
    console.log('Error fetching images:');
    throw error;
  }
}
