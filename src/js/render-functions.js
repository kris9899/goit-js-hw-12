'use strict';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery-list');
const lightbox = new simpleLightbox('.large-img', {
  overlayOpacity: 0.7,
  captionsData: 'alt',
  captionDelay: 250,
  close: true,
});

export function clearGallery() {
  gallery.innerHTML = '';
}
export function renderMarkup(arr) {
  const markup = arr
    .map(picture => {
      const {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = picture;
      return `
       <li class="img-card">
        <a class="large-img" href="${largeImageURL}">
        <div class="img-wrapper">
        <img
        class="small-img"
        src="${webformatURL}" 
        alt="${tags}"/>
        </div>
        </a>
        <ul class="gallery-info">
          <li>
          <p class="info-text">Likes</p>
           <p class="info-number">${likes}</p>
          </li>
            <li>
          <p class="info-text">Views</p>
           <p class="info-number">${views}</p>
          </li>
            <li>
          <p class="info-text">Comments</p>
           <p class="info-number">${comments}</p>
          </li>
            <li>
          <p class="info-text">Downloads</p>
           <p class="info-number">${downloads}</p>
          </li>
   </ul>
    </li>
    `;
    })
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();
}
