let BASIC_URL = 'http://127.0.0.1:8888';
let movieId = '26942674';
getDetailById();
searchByKeyWords();

function searchByKeyWords(){
  //let keyWords = '后天'//document.getElementsByClassName('search').value;
  ajax({
    url: BASIC_URL + "/v2/movie/search?q=后天",
    method: "GET",
    success: function(responseText) {
      console.log(responseText);
    }, 
  });
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





