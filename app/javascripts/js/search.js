const elements = {
  searchInput: document.querySelector('.search-engine__btn'),
  searchPlaceholder: document.getElementById('searchQuery'),
  searchResults: document.querySelector('.search-results')
}

const clearInput = () => {
  document.getElementById('searchQuery').value = '';
}

const clearResults = () => {
  elements.searchResults.innerHTML = '';
}

const errorMessage = () => elements.searchPlaceholder.className += " searchInvalid";


const searchController = () => {

  const searchValue = document.getElementById('searchQuery').value;

  if(searchValue) {

    clearResults();

    getResults(searchValue);

    clearInput();

  } else {

    errorMessage();

  }
}

const getResults = function(query) {

  const proxy = 'https://cors-anywhere.herokuapp.com/';
  const URL = 'https://www.food2fork.com/api/search';
  const key = 'bc203b98a8ece3cffd7ff66f91eb7c04'; 

  fetch(`${proxy}${URL}?key=${key}&q=${query}`)

  .then(function(res) {
    return res.json();
  })

  .then(function(data) {

    const checkResults = data.count;
    
    const recipes = data.recipes;

    if(checkResults == 0) {
      
      errorMessage();

    } else {

      recipes.forEach(recipe => {
        let markup = `
          <div class="search-results__items">
            <a href="${recipe.publisher_url}">
              <img src="${recipe.image_url}" alt="${recipe.title}" class="search-results__img">
              <div class="search-results__description">
                <h3 class="search-results__title">${recipe.title}</h3>
                <p class="search-results__description">Learn more about this <strong>${recipe.title}</strong>. Come vist our website to discover more!
                </p>
                <span id="rearch-results__publisher">#${recipe.publisher}</span> 
              </div>
            </a>
          </div>
        `;

        elements.searchResults.insertAdjacentHTML('beforeend', markup);
      })

    }

  })

  .catch(function(err) {
    console.log(err)
  })

}


elements.searchInput.addEventListener('click', () => searchController());

document.onkeydown = () => {

  if( window.event.keyCode == '13' ) {

    searchController();

  }

}

