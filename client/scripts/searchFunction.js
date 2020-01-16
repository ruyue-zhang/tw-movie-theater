let BASIC_URL = 'http://127.0.0.1:8888';
const top250 = 'top250';
var movieDatas = [];
getAllData();

function getAllData() {
  ajax({
      url: BASIC_URL + '/v2/movie/' + top250,
      method: "GET", 
      success: function(responseText) {
        movieDatas = responseText.subjects;
      }, 
  })
}

function searchByKeywords(event){
  let currentEvent = event;
  let keywords = currentEvent.target.parentNode.firstChild.nextElementSibling.value;
  console.log(keywords);
  if(keywords) {
    let moviesIdString = movieDatas.filter(value => value.title.indexOf(keywords) > -1).map(value => value.id).join('&');
    if(moviesIdString.length) {
      window.open(`search.html?movieId=${moviesIdString}`,"_self");
    } else {
      window.open(`notFindPage.html`,"_self");
    }
  }
}