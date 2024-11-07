'use strict';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import errorSvg from '../src/img/error.svg';
import { fetchImages } from './js/pixabay-api.js';
import { renderMarkup, clearGallery } from './js/render-functions.js';

const form = document.querySelector('.search-form');
const input = document.querySelector('.search-input');
const loader = document.querySelector('.loader');
const loadMoreButton = document.querySelector('.load-button');
const loadMoreLoader = document.querySelector('.load-more-loader');

let page = 1;
let perPage = 15;
let currentQuery = '';
let totalHits = 0;
let loadedImages = 0;

form.addEventListener('submit', handleSubmit);
loadMoreButton.addEventListener('click', loadMoreImages);

async function handleSubmit(event) {
  event.preventDefault();
  loader.classList.remove('visually-hidden');
  loadMoreButton.classList.add('visually-hidden');

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
  if (query !== currentQuery) {
    currentQuery = query;
    page = 1;
    clearGallery();
    loadedImages = 0;
  }

  try {
    const data = await fetchImages(currentQuery, page, perPage);
    totalHits = data.totalHits;
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
      loadMoreButton.classList.add('visually-hidden');
    } else {
      renderMarkup(data.hits);
      loadedImages += data.hits.length;
      page += 1;
      loadMoreButton.classList.remove('visually-hidden');

      if (loadedImages >= totalHits) {
        loadMoreButton.classList.add('visually-hidden');
        iziToast.info({
          titleColor: '#fff',
          titleLineHeight: 1.5,
          titleSize: '16px',
          message: "We're sorry, but you've reached the end of search results.",
          maxWidth: '432px',
          position: 'topRight',
          closeOnEscape: true,
          icon: 'info',
          iconUrl: errorSvg,
          theme: 'dark',
          messageSize: '16px',
          messageLineHeight: 1.5,
          messageColor: '#fff',
          backgroundColor: '#90d5ff',
        });
      }
    }
  } catch (error) {
    console.log('Error fetching images:');
  } finally {
    console.log('Hiding loader');
    input.value = '';
    loader.classList.add('visually-hidden');
  }
}

async function loadMoreImages() {
  loadMoreLoader.classList.remove('visually-hidden');
  try {
    const data = await fetchImages(currentQuery, page, perPage);
    if (data.hits.length > 0) {
      renderMarkup(data.hits);
      loadedImages += data.hits.length;
      page += 1;

      if (loadedImages >= totalHits) {
        loadMoreButton.classList.add('visually-hidden');
        iziToast.info({
          titleColor: '#fff',
          titleLineHeight: 1.5,
          titleSize: '16px',
          message: "We're sorry, but you've reached the end of search results.",
          maxWidth: '432px',
          position: 'topRight',
          closeOnEscape: true,
          icon: 'info',
          iconUrl: errorSvg,
          theme: 'dark',
          messageSize: '16px',
          messageLineHeight: 1.5,
          messageColor: '#fff',
          backgroundColor: '#90d5ff',
        });
      }
    } else {
      loadMoreButton.classList.add('visually-hidden');
      iziToast.info({
        titleColor: '#fff',
        titleLineHeight: 1.5,
        titleSize: '16px',
        message: "We're sorry, but you've reached the end of search results.",
        maxWidth: '432px',
        position: 'topRight',
        closeOnEscape: true,
        icon: 'info',
        iconUrl: errorSvg,
        theme: 'dark',
        messageSize: '16px',
        messageLineHeight: 1.5,
        messageColor: '#fff',
        backgroundColor: '#90d5ff',
      });
    }
  } catch (error) {
    console.log('Error loading more images:');
  } finally {
    loadMoreLoader.classList.add('visually-hidden');
    loader.classList.add('visually-hidden');
  }
}
