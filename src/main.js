'use strict';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import errorSvg from '../src/img/error.svg';
import { fetchImages } from './js/pixabay-api.js';
import { renderMarkup, clearGallery } from './js/render-functions.js';

const form = document.querySelector('.search-form');
const input = document.querySelector('.search-input');
const loader = document.querySelector('.loader');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  loader.classList.remove('visually-hidden');

  const query = event.target.querySelector('input').value.trim();
  if (!query) {
    iziToast.error({
      titleColor: '#fff',
      titleLineHeight: 1.5,
      titleSize: '16px',
      message: 'Please enter a search term.',
      maxWidth: '432px',
      position: 'topRight',
      closeOnEscape: true,
      icon: 'error',
      iconUrl: errorSvg,
      theme: 'dark',
      messageSize: '16px',
      messageLineHeight: 1.5,
      messageColor: '#fff',
      backgroundColor: '#ef4040',
    });
    input.value = '';
    loader.classList.add('visually-hidden');
    return;
  }
  fetchImages(query)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          titleColor: '#fff',
          titleSize: '16px',
          titleLineHeight: 1.5,
          messageSize: '16px',
          messageLineHeight: 1.5,
          messageColor: '#fff',
          backgroundColor: '#ef4040',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          maxWidth: '432px',
          position: 'topRight',
          closeOnEscape: true,
          icon: 'error',
          iconUrl: errorSvg,
          theme: 'dark',
        });
        clearGallery();
      } else {
        renderMarkup(data.hits);
      }
    })
    .catch(error => {
      console.error('Error fetching images:', error);
    })
    .finally(() => {
      console.log('Hiding loader');
      input.value = '';
      loader.classList.add('visually-hidden');
    });
}
