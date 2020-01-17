let BASIC_URL = 'http://127.0.0.1:8888';
const top250 = 'top250';
var movieDatas = JSON.parse(localStorage.getItem("moviedata"));



function searchByKeywords(event){
  let keywords = document.getElementsByClassName("search-box")[0].value;
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