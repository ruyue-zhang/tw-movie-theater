let BASIC_URL = 'http://127.0.0.1:8888';
let movieId = 'top250';

ajax({
    url: BASIC_URL + "/v2/movie/subject/" + movieId,
    method: "GET",
    success: function(responseText) {
      console.log(responseText);
    }, 
});
