let BASIC_URL = 'http://127.0.0.1:8888';
let movieId = '26942674';
getDetailById();

function searchByKeyWords(){
  let keyWords = document.getElementsByClassName('search-box')[0].value;
  console.log(keyWords);
  // ajax({
  //   url: BASIC_URL + "/v2/movie/search?q=" + keyWords,
  //   method: "GET",
  //   success: function(responseText) {
  //     console.log(responseText);
  //   }, 
  // });
　window.open('detail.html');
}

function getDetailById() {
  ajax({
    url: BASIC_URL + "/v2/movie/subject/" + movieId,
    method: "GET",
    success: function(responseText) {
      console.log(responseText);
    }, 
  });
}





