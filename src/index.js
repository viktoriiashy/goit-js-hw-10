import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const inputRef = document.querySelector('input#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

const onInputSearch = () => {
  fetchCountries(inputRef.value.trim()).then(checkInputLength);
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
};
inputRef.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function checkInputLength(search) {
  if (search.length > 10) {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (search.length >= 2 && search.length < 10) {
    renderCountriesList(search);
  } else if (search.length === 1) {
    renderCountry(search);
  }
}

function renderCountriesList(countries) {
  const markup = countries
    .map(country => {
      return `<div>
       <img src="${country.flags.svg}" alt="Flag" width = 50>
        <p>${country.name.official}</p>
        </div>`;
    })
    .join('');
  countryList.innerHTML = markup;
  countryInfo.innerHTML = '';
}
function renderCountry(countries) {
  const markup = countries
    .map(country => {
      return `<div>
      <img src="${country.flags.svg}" alt="Flag" width = 100>
          <p><b>${country.name.official}</b></p>
          <p><b>Capital</b>: ${country.capital}</p>
          <p><b>Population </b>: ${country.population}</p>
          <p><b>Languages </b>: ${Object.values(country.languages)}</p>
        </div>`;
    })
    .join('');
  countryInfo.innerHTML = markup;
  countryList.innerHTML = '';
}
