let BASIC_URL = 'http://127.0.0.1:8888';
let movieId = 'top250';

function getAllData() {
  ajax({
      url: BASIC_URL + '/v2/movie/' + movieId + '?apikey=',
      method: "GET",
      data: {
        apikey: '0df993c66c0c636e29ecbb5344252a4a&start=0&count=250',
      },
      success: function(responseText) {
      }, 
  })
}

getAllData();