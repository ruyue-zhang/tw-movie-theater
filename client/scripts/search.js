let BASIC_URL = 'http://127.0.0.1:8888';
let moviesIdArr =  window.location.search.substring(1).split('=')[1].split('&');
console.log(moviesIdArr);
getSearchResult();
let resultList = '';
function getSearchResult() {
  moviesIdArr.forEach(value => {
    //console.log(value);
    ajax({
      url: BASIC_URL + "/v2/movie/subject/" + value,
      method: "GET",
      success: function(responseText) {
        //renderSearchReaults(responseText);
      }, 
    });
  })
}

