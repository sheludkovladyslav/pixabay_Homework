import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/Angeler.css';
import '@pnotify/core/dist/Material.css';
import '@pnotify/core/dist/BrightTheme.css';
import HandleBars from 'handlebars';

import countriesListSrc from 'bundle-text:../templates/countries-list.hbs';
import oneCountrySrc from 'bundle-text:../templates/one-country.hbs';

export const fetchCountries = searchQuery => {
  const container = document.querySelector('.countries');
  const fetchResult = fetch(
    `https://restcountries.com/v3.1/name/${searchQuery}`
  )
    .then(response => response.json())
    .then(data => {
      if (data.length >= 2 && data.length < 10) {
        container.innerHTML = '';
        data.map(country => {
          container.insertAdjacentHTML(
            'beforeend',
            `<li class="country__name">${country.name.common}</li>`
          );
        });
      }

      if (data.length === 1) {
        data.map(country => {
          const countryTemplate = HandleBars.compile(oneCountrySrc);
          const html = countryTemplate({ country });
          container.innerHTML = html;
        });
      }

      if (data.length >= 10) {
        error({
          title: 'Too many matches found. Please enter more specific query!',
          delay: 2000,
          addClass: 'custom',
        });
      }
    });
};
