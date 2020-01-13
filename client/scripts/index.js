let BASIC_URL = 'http://127.0.0.1:8888';
let movieId = '26942674';

function getAllData() {
  ajax({
      url: BASIC_URL + '/v2/movie/subject/' + movieId,
      method: "GET",
      data: {
        apikey: '0df993c66c0c636e29ecbb5344252a4a',
      },
      success: function(responseText) {
      }, 
  })
}