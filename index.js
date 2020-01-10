let api_key = 'sgJJY0RpJbXNKMU1sqAwU9nBNvSpxq0D8VTFbLLj';
let endpoint = 'https://developer.nps.gov/api/v1/parks';

function getParks(searchTerm, maxResults=10) {
  let params = {
    api_key: api_key,
    limit: maxResults,
    stateCode: searchTerm
  };

  const queryString = $.param(params);
  const url = endpoint + '?' + queryString;

  fetch(url) 
    .then(response => {
      if(response.ok) {
        return response.json();
      }
      throw new Error(response.statusText)
    }) .then(responseJson => {
      displayResults(responseJson, maxResults)
      .catch(err => {
        $(`#js-error-message').text('Uh oh, something broke: ${err.message}`)
      })
    })
} 


function displayResults(responseJson, maxResults) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i = 0; i < responseJson.data.length & i < maxResults; i++) {
    $('#results-list').append(
      `<li>
      <h3><a href="${responseJson.data[i].url}">${responseJson.data[i].fullName}</a></h3>
      <p class="latlong">${responseJson.data[i].latLong}</p>
      <p>${responseJson.data[i].description}</p>
      </li>`
    );
  } 

  $('#results').removeClass("hidden");
  
}



function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    console.log(`Searching for ${maxResults} parks in`, searchTerm)
    getParks(searchTerm, maxResults);
  })
}


$(watchForm);