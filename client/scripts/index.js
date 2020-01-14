let BASIC_URL = 'http://127.0.0.1:8888';
let movieId = 'top250';

function getAllData() {
  ajax({
      url: BASIC_URL + '/v2/movie/' + movieId,
      method: "GET", 
      success: function(responseText) {
        mainPage(responseText);
      }, 
  })
}

function mainPage(data) {
  sortGenres(data);
}

function sortGenres(data) {

}

getAllData();