'use strict';
const API_KEY = '46835246-fc67a7cc3b6e50b199f619e07';
const BASE_URL = 'https://pixabay.com/api/';

export function fetchImages(query) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });

  return fetch(`${BASE_URL}?${params.toString()}`).then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });
}
