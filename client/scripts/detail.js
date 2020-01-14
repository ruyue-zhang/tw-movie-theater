renderPage();

function renderPage() {
  // let keyWords =  window.location.search.substring(1);
  ajax({
    url: BASIC_URL + "/v2/movie/subject/" + "1308779",
    method: "GET",
    success: function(responseText) {
      renderMovieInfomation(responseText);
      renderSummary(responseText);
      renderFilmReview(responseText);
      renderRecommend(responseText)
    }, 
  });
}

function renderMovieInfomation(data) {
  console.log(data.title);
}

function renderSummary(data) {
  console.log(data.summary);
}

function renderFilmReview(data) {}

function renderRecommend(data) {}


