import { debounce } from 'lodash';
import { fetchCountries } from './api/fetchCountries';
const countryInput = document.querySelector('.form__input');
countryInput.addEventListener(
  'input',
  debounce(event => {
    fetchCountries(event.target.value);
  }, 500)
);
